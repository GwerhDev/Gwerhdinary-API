const router = require("express").Router();
const { uploadFileToS3, deleteFileFromS3ByUrl } = require("../../integrations/aws");
const { decodeToken } = require("../../integrations/jwt");
const { message } = require("../../messages");
const Credential = require("../../models/Credential");

router.post("/upload", async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: "File not found in request body" });

    const { file, clientId, clientSecret } = req.body;

    const decodedClientSecret = await decodeToken(clientSecret);
    const decodedClientId = decodedClientSecret.clientId;

    if (clientId !== decodedClientId) return res.status(403).json({ message: message.permission.denied });

    const validatedCredential = await Credential.findById(clientId);
    if (!validatedCredential) return res.status(403).json({ message: message.permission.denied });

    if (!file.buffer || !file.mimetype || !file.originalname) {
      return res.status(400).json({ message: "Invalid file data format" });
    }

    const url = await uploadFileToS3({
      buffer: Buffer.from(file.buffer, 'base64'),
      mimetype: file.mimetype,
      originalname: file.originalname
    });

    return res.status(200).json({ url });

  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data._id }).populate('credentials');
    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { url } = req.body;
    const response = await deleteFileFromS3ByUrl(url);
    return response;

  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;