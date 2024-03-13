import connectDB from "@/integrations/mongodb";
import { NextResponse } from "next/server";
import { ImageModel } from "@/models/Image";
import { convertBase64ToBuffer } from "@/utils/convertBase64ToBuffer";
import { Readable } from "stream";

export const GET = async (request: NextResponse, { params }: any) => {
  await connectDB();
  const { id } = params || null;

  try {
    const image = await ImageModel.findById(id);
    if (!image || !image.image) {
      return NextResponse.json({ data: 'Imagen no encontrada' }, { status: 400 });
    }

    const imageBuffer = await convertBase64ToBuffer(image.image);

    const imageStream = new Readable();
    imageStream.push(imageBuffer);
    imageStream.push(null);

    return NextResponse.json({ data: image.image }, { status: 200});

  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}