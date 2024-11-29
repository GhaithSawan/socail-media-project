const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { ValidationRegister, UserModel, ValidationLogin } = require("../../models/usermodel");
let jwt = require("jsonwebtoken");

router.post("/Register", expressAsyncHandler(async (req, res) => {
    let { error } = ValidationRegister(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let usercheck = await UserModel.findOne({ email: req.body.email });
    if (usercheck) {
        return res.status(400).json({ message: "User already exists" });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(req.body.password, salt);

    let newuser = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword
    });

    await newuser.save();

    newuser = newuser.toObject();
    delete newuser.password;
    let token = jwt.sign({ id: newuser.id, isAdmin: newuser.isAdmin }, process.env.secretkey);
    res.status(201).json({ newuser, token });
}));

router.post("/Login", expressAsyncHandler(async (req, res) => {
    let { error } = ValidationLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let usercheck = await UserModel.findOne({ email: req.body.email });
    if (!usercheck) {
        return res.status(400).json({ message: "User does not exist" });
    }

    let isPasswordMatch = await bcrypt.compare(req.body.password, usercheck.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    usercheck = usercheck.toObject();
    delete usercheck.password;

    let token = jwt.sign({ id: usercheck.id, isAdmin: usercheck.isAdmin }, process.env.secretkey);

    res.status(200).json({ usercheck, token });
}));

module.exports = router;
