// const User = require('../models/userModel');
// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const loginWithGoogle = async (token) => {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   const { email, name, picture } = ticket.getPayload();
//   let user = await User.findOne({ email });
//   if (!user) {
//     user = new User({ email, name, picture });
//     await user.save();
//   }
//   const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
//   return { user, token: jwtToken };
// };

// module.exports = { loginWithGoogle };














// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const loginWithGoogle = async (token) => {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   const { email, name, picture } = ticket.getPayload();

//   let user = await User.findOne({ email });
//   if (!user) {
//     user = new User({ email, name, picture });
//     await user.save();
//   }

//   const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return { user, token: jwtToken };
// };

// const signUp = async ({ name, lastName, email, password }) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, lastName, email, password: hashedPassword });
//   await user.save();

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return { user, token };
// };

// const login = async ({ email, password }) => {
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     throw new Error('Invalid email or password');
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return { user, token };
// };

// module.exports = { signUp, login, loginWithGoogle };



const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginWithGoogle = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, name, picture });
    await user.save();
  }

  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user, token: jwtToken };
};

const signUp = async ({ name, lastName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, lastName, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user, token };
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  console.log("user:: ", user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  console.log("token:: ", token);

  return { user, token };
};

module.exports = { signUp, loginService, loginWithGoogle };
