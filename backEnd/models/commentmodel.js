const mongoose = require("mongoose");
const joi = require("joi");

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostModel",
        },
        text: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        username: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const CommentModel = mongoose.model("CommentModel", commentSchema);

function validationcreateComment(obj) {
    const schema = joi.object({
        text: joi.string().trim().required(),
    });
    return schema.validate(obj);
}
function validationPutComment(obj) {
    const schema = joi.object({
        text: joi.string().trim().required(),
    });
    return schema.validate(obj);
}

module.exports = {
    CommentModel,
    validationcreateComment,
    validationPutComment,
};