import { Router } from "express";
import { login, register, users } from "../controllers/users.js";
import uploadByMulter from "../middlewares/multer.js";
import { loginValidation, registerValidation } from "../validation/users.js";
import validate from "../middlewares/validation.js";
const router = Router();

router.get("/", users);
router.post("/register", uploadByMulter.fields([{ name: "photo", maxCount: 1 }]), validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

export default router;
