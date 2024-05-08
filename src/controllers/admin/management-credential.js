const router = require("express").Router();
const { createClientSecret, decodeToken } = require("../../integrations/jwt");
const { role } = require("../../misc/consts");
const userSchema = require("../../models/User");
const credentialSchema = require("../../models/Credential");
const { message } = require("../../messages");

router.get("/", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data._id }).populate('credentials');
    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    return res.status(200).send(user.credentials);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data._id });
    if (!user || user.role === role.freemium) return res.status(404).send({ logged: false, message: message.permission.denied });

    const credential = await credentialSchema.create({ active: true });

    const payload = {
      clientId: credential._id
    };

    const clientSecret = createClientSecret(payload);

    const response = {
      clientId: payload.clientId,
      clientSecret,
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await credentialSchema.findByIdAndDelete(id);

    return res.status(200).send({ message: "Credential deleted succesfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Error" });
  }
});

module.exports = router;