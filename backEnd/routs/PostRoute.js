const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const expressAsyncHandler = require("express-async-handler");
let path = require("path");
let fs = require("fs");
const { verfiyToken } = require("../middlewares/VerfiyToken");
const { upload } = require("../middlewares/UploudeImg");
const { UploudCloud, DeletCloud } = require("../middlewares/cloudinary");
const VaidateObjectId = require("../middlewares/VaidateObjectId");
const { PostModel, ValidationPutPost, ValidationCreatePost } = require("../models/postmodel");

router.post(
  "/CreatePost",
  verfiyToken,
  upload.single("img"),
  expressAsyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "not file provied" });
    }

    let { error } = ValidationCreatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); 
    }

    let pathimg = path.join(__dirname, `../images/${req.file.filename}`);

    let result = await UploudCloud(pathimg);

    let post = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      caticory: req.body.caticory,
      user: req.user.id,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    res.status(200).json(post);

    fs.unlinkSync(pathimg);
  })
);


router.get(
  "/GetAllPosts",
  expressAsyncHandler(async (req, res) => {
    let { pageNumber, caticory } = req.query;
    let limit = 3;
    let posts;
    if (caticory) {
      posts = await PostModel
        .find({ caticory })
        .sort({ createdAt: -1 })
        .populate("user", ["-password"])
        .populate("comments");
    } else if (pageNumber) {
      posts = await PostModel
        .find()
        .limit(limit)
        .skip((pageNumber - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("user", ["-password"])
        .populate("comments");

    } else {
      posts = await PostModel
        .find()
        .sort({ createdAt: -1 })
        .populate("user", ["-password"])
        .populate("comments");
    }
    res.status(200).json(posts);
  })
);

router.get(
  "/GetPost/:id",
  VaidateObjectId,
  expressAsyncHandler(async (req, res) => {
    let post = await PostModel
      .findById(req.params.id)
      .populate("user", ["-password"])
      .populate("comments");
    if (!post) {
      return res.status(400).json({ message: "post not found " });
    }
    res.status(200).json(post);
  })
);

router.delete(
  "/DeletePost/:id",
  VaidateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let post = await PostModel.findById(req.params.id)
    if(!post){
      return res.status(401).json({message:"not found"})
    }
    if(req.user.isAdmin || req.user.id == post.user.toString()){
        await PostModel.findByIdAndDelete(req.params.id)
        await DeletCloud(post.image.publicId)
        res.status(200).json({message:"post deleted successfully"})
    }else{
      return res.status(301).json({message:"you don't have a permission"})
    }
  })
);


router.put(
  "/UpdatePost/:id",
  VaidateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let { error } = ValidationPutPost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }

    let post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "post not found " });
    }

    if (req.user.id !== post.user.toString()) {
      return res.status(400).json({ message: "not authorized" });
    }
    let new_post = await PostModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            caticory: req.body.caticory,
          },
        },
        { new: true }
      )
      .populate("user", ["-password"])
      .populate("comments");
    res.status(200).json(new_post);
  })
);


router.put(
  "/UpdatePostImage/:id",
  VaidateObjectId,
  verfiyToken,
  upload.single("img"),
  expressAsyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "no file" });
    }

    let post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "post not found " });
    }

    if (req.user.id !== post.user.toString()) {
      return res.status(400).json({ message: "not authorized" });
    }
    console.log("post.image.publicId",post.image.publicId);
    await DeletCloud(post.image.publicId);
    let pathImage = path.join(__dirname, `../images/${req.file.filename}`);
    let result = await UploudCloud(pathImage);
    let new_post = await PostModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            image: {
              url: result.secure_url,
              publicId: result.public_id,
            },
          },
        },
        { new: true }
      )
    .populate("user", ["-password"]);
    res.status(200).json(new_post);
    fs.unlinkSync(pathImage);
  })
);

router.put(
  "/PostLikes/:id",
  VaidateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "post not found " });
    }

    let postfind = post.likes.some((user) => user.toString() === req.user.id);
    if (postfind) {
      console.log("pull");
      post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.user.id },
        },
        { new: true }
      );
    } else {
      console.log("push");

      post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.user.id },
        },
        { new: true }
      );
    }
    res.status(200).json(post);
  })
);





module.exports = router; 