// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/login', authController.login);

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.get('/google', authController.googleAuth);
// router.get('/google/callback', authController.googleAuthCallback, authController.googleAuthRedirect);

// module.exports = router;



const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback, authController.googleAuthRedirect);

router.post('/google-login', authController.googleLogin);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

