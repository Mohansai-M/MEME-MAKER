const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        liked: null,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      const passwordcomp = await bcrypt.compare(password, user.password);
      if (!passwordcomp) {
        return res.status(400).json({ msg: "Incorrect password." });
      }

      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res
        .status(202)
        .cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          //path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        })
       res.json({ accesstoken });

    } catch (err) {
      return res.status(500);
    }
  },
  refreshToken: (req, res) => {
    try {
      const rftoken = req.cookies.refreshtoken;
      if (rftoken == null) {
        return res.status(400).json({ msg: "Please Login or Register1" });
      } else {
        jwt.verify(rftoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(400).json({ msg: "Please Login or Register2" });
          } else {
            const accesstoken = createAccessToken({ id: user.id });

            res.json({ accesstoken });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
