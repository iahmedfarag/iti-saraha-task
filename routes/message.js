import { Router } from "express";
import { createMessage, getMessagesForUser, removeMessage } from "../controllers/message.js";

const router = Router();

router.post("/", createMessage);

router.get("/:receiver", getMessagesForUser);

router.delete("/:id", removeMessage);

export default router;
