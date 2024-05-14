const router = require("express").Router();
const { decodeToken } = require("../../integrations/jwt");
const credentialSchema = require("../../models/Credential");
const { message } = require("../../messages");
const { getSignedUrl } = require("../../integrations/aws");

router.post("/create-url", async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: "File not found in request body" });

    const {
      clientId,
      clientSecret,
      mimetype,
      mediatype,
      originalname,
    } = req.body;

    const decodedClientSecret = await decodeToken(clientSecret);
    const decodedClientId = decodedClientSecret.clientId;

    if (clientId !== decodedClientId) return res.status(403).json({ message: message.permission.denied });

    const validatedCredential = await credentialSchema.findById(clientId);
    if (!validatedCredential) return res.status(403).json({ message: message.permission.denied });

    if (!mimetype || !originalname) {
      return res.status(400).json({ message: "Invalid file data format" });
    };

    if (validatedCredential.active) {
      const response = await getSignedUrl({
        clientId,
        mediatype: mediatype,
        originalname: originalname,
      });

      return res.status(200).send(response);
    };

    return res.status(404).send({ message: message.permission.denied });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;