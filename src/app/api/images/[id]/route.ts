import { NextRequest, NextResponse } from "next/server";
import { ImageModel } from "@/app/api/models/Image";
import { convertBase64ToBuffer } from "@/app/api/utils/convertBase64ToBuffer";
import { Readable } from "stream";

export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = params || null;

  try {
    const image = await ImageModel.findById(id);
    if (!image || !image.image) {
      return NextResponse.json({ data: 'Imagen no encontrada' }, { status: 400 });
    }

    return NextResponse.json({ data: image.image }, { status: 200});

  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 });
  }
}