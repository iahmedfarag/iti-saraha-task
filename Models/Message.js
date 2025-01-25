import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Receiver is required"],
        },
    },
    { timestamps: true }
);

export default model("Message", messageSchema);
