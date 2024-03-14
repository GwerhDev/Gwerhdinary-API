import connectDB from "@/app/api/integrations/mongodb";
import { NextResponse } from "next/server";
import { ImageModel } from "@/app/api/models/Image";

export const GET = async () => {
  try {
    const response: any = await ImageModel.find();
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  } 
};

export const POST = async () => {
  try {

  } catch (error) {

  }
};