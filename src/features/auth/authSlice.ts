import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authChecked: boolean;
}

type AuthResponse = {
  token: string;
  userId: string;
};

const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthState = {
  token: tokenFromStorage,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authChecked: false,
};

export const registerUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    await api.post("/auth/register", credentials);

    const response = await api.post("/auth/login", credentials);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed",
    );
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const checkAuth = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/auth/me");
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    return {
      token,
      userId: response.data.userId,
    };
  } catch {
    return rejectWithValue("Token invalid");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.authChecked = true;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.authChecked = true;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        state.authChecked = true;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.authChecked = true;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
        state.authChecked = true;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.userId = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
