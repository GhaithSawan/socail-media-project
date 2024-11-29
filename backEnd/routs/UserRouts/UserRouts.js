const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { UserModel, ValidationUpdate } = require("../../models/usermodel");
const VaidateObjectId = require("../../middlewares/VaidateObjectId");
const { verfiyTokenandAdmin, verfiyTokenandHimSelf, verfiyToken, verfiyTokenandHimSelfandAdmin } = require("../../middlewares/VerfiyToken");
let bcrypt = require("bcryptjs");
const { UploudCloud, DeletCloudMany, DeletCloud } = require("../../middlewares/cloudinary");

let path = require("path");
let fs = require("fs");
const { upload } = require("../../middlewares/UploudeImg");
const { PostModel } = require("../../models/postmodel");
let { CommentModel } = require("../../models/commentmodel")

router.get("/GetUser/:id", VaidateObjectId, expressAsyncHandler(async (req, res) => {
    let user = await UserModel.findById(req.params.id).select("-password").populate("posts");
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    res.status(200).json(user)
}))

router.get("/GetAllUsers", verfiyTokenandAdmin, expressAsyncHandler(async (req, res) => {
    let users = await UserModel.find().select("-password").populate("posts");
    res.status(200).json(users)
}))

router.put("/UpdateUser/:id", VaidateObjectId, verfiyTokenandHimSelf, expressAsyncHandler(async (req, res) => {
    let { error } = ValidationUpdate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.password) {
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    let user = await UserModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        bio: req.body.bio,
        password: req.body.password,
    }, { new: true }).select("-password")

    res.status(200).json(user)
}))


router.post("/UploadImg", verfiyToken, upload.single("img"), expressAsyncHandler(async (req, res) => {
    console.log("ملف مرفوع:", req.file); // طباعة معلومات الملف
    if (!req.file) {
        return res.status(400).json({ message: "no file uploaded" })
    }
    console.log("1");

    let imgpath = path.join(__dirname, `../../images/${req.file.filename}`)
    let result = await UploudCloud(imgpath)

    let user = await UserModel.findById(req.user.id)
    if (user.profilePhoto.publicId !== null) {
        await DeletCloud(user.profilePhoto.publicId);
    }
    console.log("3");

    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id,
    };
    user.save()
    console.log("4");
    fs.unlink(imgpath, (err) => {
        if (err) {
            console.error("Error deleting the file:", err);
        } else {
            console.log("File deleted successfully.");
        }
    });

    res.status(200).json({
        profilePhoto: {
            url: result.secure_url,
            publicId: result.public_id,
        }
    })
}))
router.delete(
    "/DeleteUser/:id",
    verfiyTokenandHimSelfandAdmin, VaidateObjectId,
    async (req, res) => {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        let posts = await PostModel.find({ user: user._id })

        let postsid = posts.map(post => { user.profilePhoto.publicId })

        if (postsid?.lenght > 0) {
            await DeletCloudMany(postsid)
        }
        await DeletCloud(user.profilePhoto.publicId);

        await PostModel.deleteMany({ user: user._id })
        await CommentModel.deleteMany({ user: user._id })
        await UserModel.findByIdAndDelete(user.id)
        res.status(200).json({ message: "user deleted " });
    }
);

router.put(
    "/UserFollowers/:id",
    VaidateObjectId,
    verfiyToken,
    expressAsyncHandler(async (req, res) => {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "post not found " });
        }
        let userfind = user.followers.some((user) => user.toString() === req.user.id);
        if (userfind) {
            console.log("pull");
            user = await UserModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { followers: req.user.id },
                },
                { new: true }
            );
        } else {
            console.log("push");

            user = await UserModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { followers: req.user.id },
                },
                { new: true }
            );
        }
        res.status(200).json(user);
    })
);


module.exports = router
