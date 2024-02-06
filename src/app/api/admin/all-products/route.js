import connectDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const user = 'admin';

    if(user === 'admin'){
        const extractAllproducts = await Product.find({});

        if (extractAllproducts) {
          return NextResponse.json({
            success: true,
            data: extractAllproducts,
          });
        } else {
          return NextResponse.json({
            success: false,
            status: 204,
            message: "No Products found",
          });
        }
        
    }else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "You are not authorized",
        });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
