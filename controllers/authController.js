// const authService = require('../services/authService');

// const login = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const user = await authService.loginWithGoogle(token);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { login };







// const passport = require('passport');

// const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// const googleAuthCallback = passport.authenticate('google', {
//   failureRedirect: '/login',
//   session: true,
// });

// const googleAuthRedirect = (req, res) => {
//   res.redirect('/');
// };

// module.exports = { googleAuth, googleAuthCallback, googleAuthRedirect };


// const express = require('express');
// const passport = require('passport');
// const { loginWithGoogle } = require('../services/authService');
// const { googleAuth, googleAuthCallback, googleAuthRedirect } = require('../controllers/authController');
// const router = express.Router();

// router.get('/auth/google', googleAuth);
// router.get('/auth/google/callback', googleAuthCallback, googleAuthRedirect);

// router.post('/auth/google-login', async (req, res) => {
//   try {
//     const { token } = req.body;
//     const { user, jwtToken } = await loginWithGoogle(token);
//     res.json({ user, token: jwtToken });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;












const { loginWithGoogle, signUp, loginService } = require('../services/authService');

const googleAuth = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  })(req, res, next);
};

const googleAuthRedirect = (req, res) => {
  res.redirect('/');
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const { user, jwtToken } = await loginWithGoogle(token);
    res.json({ user, token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const { user, token } = await signUp({ name, lastName, email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email:: ", email);
    console.log("password::: ", password);
    const { user, token } = await loginService({ email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  googleAuth,
  googleAuthCallback,
  googleAuthRedirect,
  googleLogin,
  register,
  login,
};
