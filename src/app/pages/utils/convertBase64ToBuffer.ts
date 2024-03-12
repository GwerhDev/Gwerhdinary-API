export async function convertBase64ToBuffer(base64Data: string) {
  const dataWithoutHeader = base64Data.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(dataWithoutHeader, 'base64');
};
