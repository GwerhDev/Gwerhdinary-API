const express = require("express");
const router = express.Router();
const { createToken } = require("../integrations/jwt");
const { message } = require("../messages");
const userSchema = require("../models/User");
const bcrypt = require("bcrypt");
const { status } = require("../misc/consts");

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const user = await userSchema.findOne({ email: data.email });
    if (!user) return res.status(400).send({ error: message.login.notexistinguser });
    if (user.status === status.pending) return res.status(400).send({ error: message.login.pending });

    if (data.password !== null && data.email !== null) {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const { _id, username, email } = user;
        const data_login = { _id, username, email };
        const token = await createToken(data_login, 3);

        return res.status(200).send(token);

      } else {
        return res.status(400).send({ error: message.login.credentialsfailure });
      };
    };

    return res.status(400).send({ error: message.login.failure });

  } catch (error) {
    return res.status(500).send({ msg: message.login.failure });
  };
});

module.exports = router;