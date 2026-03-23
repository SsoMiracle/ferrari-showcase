import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginUser, registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Logo from "../components/ui/Logo/Logo";

function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailBackendError = error === "User not found";
  const passwordBackendError = error === "Wrong password";

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Please enter your password";
    }

    setFormErrors(errors);

    return !errors.email && !errors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isLoginMode) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ email, password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[560px] px-6">
        {/* LOGO */}
        <div className="flex justify-center mb-7">
          <Logo />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-[52px] text-black scale-y-75 font-normal -mb-1">
          Welcome
        </h1>

        <p className="text-center text-[18px] text-black mb-9 scale-y-90 font-light">
          Login using: email
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* EMAIL FIELD */}
          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors((prev) => ({ ...prev, email: "" }));
              }}
            />

            <p className="text-red-500 text-[16px] h-[25px] mt-[4px]">
              {formErrors.email || (emailBackendError ? error : "")}
            </p>
          </div>

          {/* PASSWORD FIELD */}
          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, password: "" }));
              }}
            />

            <p className="text-red-500 text-[16px] h-[25px] mt-[4px]">
              {formErrors.password || (passwordBackendError ? error : "")}
            </p>
          </div>

          {/* BUTTON */}
          <Button variant="auth" type="submit" disabled={loading}>
            {loading ? "Loading..." : isLoginMode ? "CONTINUE" : "REGISTER"}
          </Button>
        </form>

        {/* OR divider */}
        <div className="flex items-center gap-2 mt-5 -mb-2">
          <div className="flex-1 h-[1px] bg-black"></div>

          <span className="text-black text-xs uppercase tracking-[0.2em]">
            or
          </span>

          <div className="flex-1 h-[1px] bg-black"></div>
        </div>

        {/* SWITCH MODE */}
        <div className="text-center mt-4 text-gray-500 font-light text-[18px]">
          {isLoginMode ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLoginMode(false)}
                className="text-black underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLoginMode(true)}
                className="text-black underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
