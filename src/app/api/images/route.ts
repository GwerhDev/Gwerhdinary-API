import connectDB from "@/integrations/mongodb";
import { NextResponse } from "next/server";
import { ImageModel } from "@/models/Image";

export const GET = async () => {
  await connectDB();
  try {
    const response: any = await ImageModel.find();
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  } 
};

export const POST = async () => {
  await connectDB();
  try {

  } catch (error) {

  }
};