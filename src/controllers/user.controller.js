import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createUser(req, res) {
  try {
    const { userName, email, password, mobile, address, userType } = req.body;
    const userId = `user_${mobile}`;

    if (!userName || !email || !password || !mobile || !userType) {
      return res.status(400).send({
        success: false,
        message: "All Fields are Required!",
      });
    }

    // hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isFoundUser = await userModel.findOne({ email });
    const isFoundMobile = await userModel.findOne({ mobile });

    if (isFoundUser) {
      return res.status(400).send({
        success: false,
        message: "Email Already Exists Please Login!",
      });
    }

    if (isFoundMobile) {
      return res.status(400).send({
        success: false,
        message: "Mobile Number Already Exists!",
      });
    }

    const result = await userModel.create({
      userId,
      userName,
      email,
      password: hashPassword,
      mobile,
      address,
      userType,
    });

    return res.status(201).send({
      success: true,
      message: "Successfully saved in Database!",
      result,
    });
  } catch (error) {
    console.log("Error occured in createUserApi", error);

    return res.status(500).send({
      success: false,
      message: "Error occured in createUserApi",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }

    const user = await userModel.findOne({
      email,
      isDeleted: false,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, userId: user.userId, userType: user.userType },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "1d" },
    );

    // user.token = token;
    // await user.save();

    await userModel.updateOne(
      { userId: user.userId },
      { $set: { token: token } },
    );

    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      token,
    });
  } catch (error) {
    console.error("Error occurred in loginUser API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// get Single user
export async function getUser(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    return res.status(200).json({
      success: true,
      message: "user",
      user,
    });
  } catch (error) {
    console.error("Error occurred in getAllUser API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// getAllUser
export async function getAllUser(req, res) {
  try {
    const users = await userModel.find({}, { _id: 0 });
    // console.log(users);
    return res.status(200).json({
      success: true,
      message: "user",
      users,
    });
  } catch (error) {
    console.error("Error occurred in getAllUser API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function update(req, res) {
  const { userName, email, password, mobile, address, userType } = req.body;

 
}
