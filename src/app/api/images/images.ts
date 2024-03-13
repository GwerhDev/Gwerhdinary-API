import { Readable } from 'stream';
import { ImageModel } from '../../../models/Image';
import { convertBase64ToBuffer } from '../../../utils/convertBase64ToBuffer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const image = await ImageModel.findById(id);

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