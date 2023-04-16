import { Router } from "express";
import { register, login, updateUser } from "../controllers/auth";
import { auth } from "../middleware/authentication";
import { testUser } from "../middleware/testUser";
import rateLimiter from "express-rate-limit";

const APILimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

const router = Router();
router.post("/register", APILimiter, register);
router.post("/login", APILimiter, login);
router.patch("/updateUser", auth, testUser, updateUser);

export default router;
