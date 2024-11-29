const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const expressAsyncHandler = require("express-async-handler");
const { validationcreateComment, CommentModel, validationPutComment } = require("../models/commentmodel");
const { verfiyTokenandAdmin, verfiyToken } = require("../middlewares/VerfiyToken");
const VaidateObjectId = require("../middlewares/VaidateObjectId");
const { UserModel } = require("../models/usermodel");

router.post(
  "/CreateComment/:id",
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationcreateComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); 
    }
    let userprofile = await UserModel.findById(req?.user?.id);
    console.log(userprofile);
    let Comment = await CommentModel.create({
      text: req.body.text,
      username: userprofile?.username,
      user: req.user.id,
      postId: req.params.id 
  });
    res.status(200).json(Comment);
  })
);


router.get(
  "/GetAllComments",
  verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let Comments = await CommentModel.find().populate("user", ["-password"]);
    res.status(200).json(Comments);
  })
);


router.delete(
  "/DeleteComment/:id",
  VaidateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let Comment = await CommentModel.findById(req.params.id)
    if (!Comment) {
      return res.status(401).json({ message: "not found" })
    }
    if (req.user.isAdmin || req.user.id == Comment.user.toString()) {
      await CommentModel.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "Comment deleted successfully" })
    } else {
      return res.status(301).json({ message: "you don't have a permission" })
    }
  })
);


router.put(
  "/UpdateComment/:id",
  VaidateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationPutComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); 
    }

    let Comment = await CommentModel.findById(req.params.id);
    if (!Comment) {
      return res.status(400).json({ message: "Comment not found " });
    }

    if (req.user.id !== Comment.user.toString()) {
      return res.status(400).json({ message: "not authorized" });
    }
    let new_Comment = await CommentModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
          },
        },
        { new: true }
      )
      .populate("user", ["-password"])
    res.status(200).json(new_Comment);
  })
);


module.exports = router; 