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

const updateAddress = async ({ user_id, email, name, lastName, phoneNumber, address, zipCode, city, state, isMain }) => {
  console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (isMain) {
    user.addresses.forEach(addr => {
      addr.isMain = false;
    });
  }

  const existingAddressIndex = user.addresses.findIndex(
    addr => 
      addr.name === name &&
      addr.lastName === lastName &&
      addr.phoneNumber === phoneNumber &&
      addr.address === address &&
      addr.zipCode === zipCode &&
      addr.city === city &&
      addr.state === state
  );

  if (existingAddressIndex !== -1) {
    user.addresses[existingAddressIndex] = {
      name,
      lastName,
      phoneNumber,
      address,
      zipCode,
      city,
      state,
      isMain,
    };
  } else {
    user.addresses.push({
      name,
      lastName,
      phoneNumber,
      address,
      zipCode,
      city,
      state,
      isMain,
    });
  }

  await user.save();

  return user;
};


module.exports = { signUp, loginService, loginWithGoogle, updateAddress };