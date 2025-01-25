import Joi from "joi";

export const registerValidation = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 3 characters.",
        "string.max": "Name must be less than 50 characters.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address.",
    }),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required.",
            "string.pattern.base": "Phone number must be between 10 and 15 digits.",
        }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters.",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords must match.",
        "string.empty": "Confirm password is required.",
    }),
});

export const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters.",
    }),
});
