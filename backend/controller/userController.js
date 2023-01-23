const userModel = require("../models/userModel");
const valid = require("../validations/validator.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//===========================================create user=====================================//
const createUser = async (req, res) => {
  try {
    let data = req.body;
    let { title, name, phone, email, password, address } = data;
    //===emptyRequest===//
    if (!valid.isValidRequestBody(data)) {
      return res.status(400).json("plz provide data");
    }

    //                              <<===mandatory/format===>>                                     //
    //--title--//
    if (!title) {
      return res.status(400).json("Title is required");
    }
    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res.status(400).json("Title should contain Mr.,Mrs.,Miss");
    }

    //--name--//
    if (!valid.isValid(name)) {
      return res.status(400).json("name is required");
    }
    if (!valid.isValidName(name)) {
      return res
        .status(400)
        .json(" Name's first character must be capital...!");
    }

    //--phone--//
    if (!valid.isValid(phone)) {
      return res.status(400).json("phone is required");
    }
    if (!valid.isValidMobile(phone)) {
      return res.status(400).json(" only 10 character ");
    }
    const dublicatePhone = await userModel.findOne({ phone: phone });
    if (dublicatePhone) {
      return res.status(400).json("phone must be unique...!");
    }

    //--email--//
    if (!valid.isValid(email)) {
      return res.status(400).json("email is required");
    }
    if (!valid.isValidEmail(email)) {
      return res
        .status(400)
        .json(
          "emailId is required and must be unique and must be in valid format =>example@gmail.com...!"
        );
    }
    const dublicateEmail = await userModel.findOne({ email: email });
    if (dublicateEmail) {
      return res.status(400).json(" Email Already Present");
    }

    //--password--//
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    const Passregx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/;
    let Password = Passregx.test(password);
    if (!Password) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
        );
    }
    if (address) {
      if (typeof address !== "object") {
        return res.status(400).json("address should be in object format only");
      }

      if (typeof address.street !== "string") {
        return res.status(400).json("provid street address");
      }
      if (address.city) {
        if (typeof address.city !== "string") {
          return res.status(400).json("provid city address");
        }
      } else if (address.pincode) {
        if (!valid.isValidpin(address.pincode)) {
          return res.status(400).json(" pincode must have 6 digits only");
        }
      }
    }
    //===creation===//

    let savedData = await userModel.create(data);
    res.status(201).json(savedData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//=======================================login/token generation===============================//

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    if (!valid.isValidRequestBody(data)) {
      return res.status(400).json("plz provide data");
    }

    if (!valid.isValid(email)) {
      return res.status(400).json("email is required");
    }

    if (!valid.isValid(password)) {
      return res.status(400).json("password is required");
    }

    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).json("Email Or Password is Incorrect");
    }
    let exp = "20h";
    const token = jwt.sign({ userId: user._id }, "Project-3_Group-5", {
      expiresIn: exp,
    });
    res
      .cookie("cookies_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ user, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const logout = async (req, res) => {
  try {
    res
      .clearCookie("cookies_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("logged out");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { createUser, loginUser, logout };
