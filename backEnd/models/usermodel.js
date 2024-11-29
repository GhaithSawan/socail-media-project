let mongoose = require("mongoose")
const joi = require("joi");

let UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
        },
        followers:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            }
        ],
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        isAdmin: {
            type: Boolean,
            default: true,
        },
        isAccountVerified: {
            type: Boolean,
            default: false,
        },
        profilePhoto: {
            type: Object,
            default: {
                url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                publicId: null,
            },
        },
        bio: {
            type: String,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


UserSchema.virtual("posts", {
    ref: "PostModel",
    foreignField: "user",
    localField: "_id",
});

let UserModel = mongoose.model("UserModel", UserSchema)

function ValidationRegister(obj) {
    const schema = joi.object({
        username: joi.string().trim().required(),
        password: joi.string().trim().required(),
        email: joi.string().trim().required(),
    });
    return schema.validate(obj);
}
function ValidationLogin(obj) {
    const schema = joi.object({
        password: joi.string().trim().required(),
        email: joi.string().trim().required(),
    });
    return schema.validate(obj);
}
function ValidationUpdate(obj) {
    const schema = joi.object({
        username: joi.string(),
        password: joi.string().trim(),
        bio: joi.string()
    });
    return schema.validate(obj);
}

module.exports = {
    UserModel,
    ValidationRegister,
    ValidationLogin,
    ValidationUpdate
}