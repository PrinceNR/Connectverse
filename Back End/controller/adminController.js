const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
require('dotenv').config();


const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

let username;
let emaile;
let passworde;
const otp = generateOtp();
const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  username = name, emaile =email, passworde = password

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await admin.findOne({ email: email });

  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "your otp code",
    text: `your otp code is ${otp}`,
  };
 
  console.log("OTP ===",otp);
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Otp sent to your email",
      email :email,
    });
  } catch (error) {
    res.status(500).json({ error: "failed to send otp" });
  }

});
const verifyOtp = asyncHandler(async (req, res) => {
    console.log("otp req.body: ", req.body.otp);
    
    const typedOtp = req.body.otp;
    if (otp == typedOtp) {
      try {
        const hashedPassward = await bcrypt.hash(passworde, 10);
        console.log("username :",username,"emaile ;",emaile ,"password:", hashedPassward );
        
        const newAdmin = await admin.create({
          name :username,
          email : emaile,
          password: hashedPassward,
        });
        if (newAdmin) {
          res
            .status(200)
            .json({ admin: newAdmin, message: "admin created successfully" });
        }
      } catch (err) {
        console.error("Error creating admin:", err);
        res.status(500).json({ message: err.message });
      }
    }
  });

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const availableAdmin = await admin.findOne({ email: email });

  if (!availableAdmin) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const ismatch = await bcrypt.compare(password, availableAdmin.password);

  try {
    if (!ismatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const accessToken = tokenCreation(availableAdmin);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000, // 1 hour
    });
    res.status(200).json({
      message: "token created successfully",
      accessToken: accessToken,
      admin: availableAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const tokenCreation = (data) => {
  const payload = {
    username: data.name,
    email: data.email,
    password: data.password,
    id: data.id,
  };

  const acesstoken = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "30m",
  });

  return acesstoken;
};

const logOutAdmin = asyncHandler(async (req, res) => {
  console.log("Admin Log Out");

  res.clearCookie("token").json({ message: "cookie cleared sucessfully" });
});

const profileImage = asyncHandler(async (req, res) => {
        res.status(200).send(req.file) 
});

module.exports = { createAdmin, loginAdmin, profileImage, logOutAdmin , verifyOtp};
