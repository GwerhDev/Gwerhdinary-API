import { Readable } from 'stream';
import { imageModel } from '../models/Image';
import { convertBase64ToBuffer } from '../utils/convertBase64ToBuffer';

export default async function handler(req: any, res: any) {
  try {
    const { id } = req.query;
    const image = await imageModel.findById(id);

    if (!image || !image.image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    const imageBuffer = await convertBase64ToBuffer(image.image);

    const imageStream = new Readable();
    imageStream.push(imageBuffer);
    imageStream.push(null);

    res.setHeader('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}