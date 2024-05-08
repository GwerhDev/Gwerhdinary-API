const router = require("express").Router();
const { environment } = require('../../config');
const { createClientSecret } = require("../../integrations/jwt");
const credentialSchema = require("../../models/Credential");

environment !== "production" &&
  router.post("/create", async (req, res) => {
    try {
      const credential = await credentialSchema.create({});

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