import Message from "../models/Message.js";
import User from "../models/User.js";

export const createMessage = async (req, res) => {
    try {
        const { message, receiver } = req.body;

        const receiverExists = await User.findById(receiver);
        if (!receiverExists) {
            return res.status(404).json({ error: "Receiver not found" });
        }

        const newMessage = new Message({
            message,
            receiver,
        });

        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message" });
    }
};

export const getMessagesForUser = async (req, res) => {
    try {
        const { receiver } = req.params;

        const messages = await Message.find({ receiver }).sort({ createdAt: -1 });

        res.status(200).json({ data: messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
};

export const removeMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { receiver } = req.body;

        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (message.receiver.toString() !== receiver.toString()) {
            return res.status(403).json({ error: "You can only delete messages sent to you" });
        }

        await Message.deleteOne({ _id: id });

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete message" });
    }
};
