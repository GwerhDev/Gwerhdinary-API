const router = require('express').Router();
const bcrypt = require("bcrypt");
const { message } = require('../messages');
const { role, status } = require('../misc/consts');
const { adminEmailList } = require("../config");
const userSchema = require("../models/User");
const { createToken } = require('../integrations/jwt');

router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) return res.status(400).send({ error: message.signup.error });

    const existingUser = await userSchema.findOne({ email: email }) || null;
    
    if (existingUser) {
      const tokenData = {
        id: existingUser._id,
        role: existingUser.role,
      };
      
      const token = await createToken(tokenData, 3);
      return res.status(200).send({ token });
    };
    
    const userData = {
      username,
      password,
      email,
      role: role.freemium,
      status: status.inactive,
      profilePic: null,
    };
    
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(password, salt);
    
    console.log(userData)
    if (adminEmailList.includes(email)) userData.role = role.admin;
    
    const userCreated = await userSchema.create(userData);

    const tokenData = {
      id: userCreated._id,
      role: userCreated.role,
    };

    const token = await createToken(tokenData, 3);

    return res.status(200).send({ msg: message.signup.success, token });

  } catch (error) {
    return res.status(500).send({ error: message.signup.error });
  };
});

module.exports = router;
