// const { validationResult } = require('express-validator');
// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const User = require('../models/userModel');

// /**
//  * @route POST /api/users
//  * @desc Register new user
//  * @access Public
//  */
// const registerUser = asyncHandler(async (req, res) => {
//   // Validate request body data
//   const errors = validationResult(req);
//   console.log(errors.array());
//   if (!errors.isEmpty()) {
//     res.status(400);
//     throw new Error(
//       errors
//         .array()
//         .map(error => error.msg)
//         .join('\n')
//     );
//   }

//   // Get user data from request body
//   const { name, email, password } = req.body;

//   // Check if user exists
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   // Hash password
//   // doc: https://www.npmjs.com/package/bcryptjs
//   const salt = await bcrypt.genSalt(10);
//   console.log(salt);

//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Create user
//   const user = await User.create({ name, email, password: hashedPassword });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// /**
//  * @route POST /api/users/login
//  * @desc Authenticate user
//  * @access Public
//  */
// const loginUser = asyncHandler(async (req, res) => {
//   // Get user data from request body
//   const { email, password } = req.body;

//   // Check if user exists
//   const user = await User.findOne({ email });

//   if (
//     user &&
//     (await bcrypt.compare(
//       typeof password === 'undefined' ? '' : password,
//       user.password
//     ))
//   ) {
//     res.status(200).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid credentials');
//   }
// });

// /**
//  * @route GET /api/users/me
//  * @desc Get user data
//  * @access Private
//  */
// const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user);
// });

// const generateToken = id =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const regiserUser = async (req, res) => {
  try {
    // Get data from request body
    const name =
      typeof req.body.name === 'string' ? req.body.name.trim() : false;
    const email =
      typeof req.body.name === 'string' ? req.body.email.trim() : false;
    const password =
      typeof req.body.name === 'string' && req.body.password.trim().length >= 8
        ? req.body.password.trim()
        : false;

    // Check if data is valid
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    // doc: https://www.npmjs.com/package/bcryptjs
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
};
const loginUser = async (req, res) => {
  try {
    // Get data from request body
    const email =
      typeof req.body.email === 'string' ? req.body.email.trim() : false;
    const password =
      typeof req.body.password === 'string' &&
      req.body.password.trim().length >= 8
        ? req.body.password.trim()
        : false;

    // Check if data is valid
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists and password is valid
    const user = await User.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
};
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = { regiserUser, loginUser, getMe };
