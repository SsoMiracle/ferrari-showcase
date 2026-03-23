import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { getMe } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, getMe);

// protected route

// router.get("/me", authMiddleware, getMe, (req: AuthRequest, res) => {
//   res.json({
//     message: "Authorized",
//     userId: req.userId,
//   });
//   console.log("REQ USER ID:", req.userId);
// });

// router.get("/me", authMiddleware, (req, res) => {
//   const id = req.userId; //
//   res.json({ id });
// });

export default router;
