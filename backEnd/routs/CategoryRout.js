const expressAsyncHandler = require("express-async-handler");
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const { CategoryModel, ValidationCreateCategory } = require("../models/CatigoryModel");
const { verfiyTokenandAdmin } = require("../middlewares/VerfiyToken");
let validateObjectid = require("../middlewares/VaidateObjectId")
router.post(
  "/CreateCategory",
  verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let { error } = ValidationCreateCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); 
    }

    let Category = await CategoryModel.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.status(200).json(Category);
  })
);

router.get(
  "/getAllCategory",
  expressAsyncHandler(async (req, res) => {
    let Category = await CategoryModel.find();
    res.status(200).json(Category);
  })
);
router.delete(
  "/DeleteCategory/:id",validateObjectid,verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let Category = await CategoryModel.findById(req.params.id);
    if (!Category) {
      return res.status(400).json({ message: " not found" });
    }
    await CategoryModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Category deleted"});
  })
);

module.exports = router; 