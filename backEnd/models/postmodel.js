let mongoose = require("mongoose")
const joi = require("joi");
let PostSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            }
        ],
        image: {
            type: Object,
            default: {
                url: "",
                publicId: null,
            }
        },
        caticory: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

PostSchema.virtual("comments", {
    ref: "CommentModel",
    localField: "_id",
    foreignField: "postId",
    justOne: false
});

let PostModel = mongoose.model("PostModel", PostSchema)


function ValidationCreatePost(obj) {
    const schema = joi.object({
        title: joi.string().trim().required(),
        description: joi.string().trim().required(),
        caticory: joi.string().trim().required(),
    });
    return schema.validate(obj);
}
function ValidationPutPost(obj) {
    const schema = joi.object({
        title: joi.string().trim(),
        description: joi.string().trim(),
        caticory: joi.string().trim(),

    });
    return schema.validate(obj);
}

module.exports = {
    PostModel,
    ValidationCreatePost,
    ValidationPutPost
}