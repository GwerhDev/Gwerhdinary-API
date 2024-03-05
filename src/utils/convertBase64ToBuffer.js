async function convertBase64ToBuffer(base64Data) {
  const dataWithoutHeader = base64Data.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(dataWithoutHeader, 'base64');
};

module.exports = {
  convertBase64ToBuffer
};