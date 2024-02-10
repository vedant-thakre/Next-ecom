import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const isAuthUser = await AuthUser(req);

    if (!isAuthUser) {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }

    const data = await req.json();
    const { id } = data;

    const isCurrentCartItemAlreadyExists = await Cart.findById(id);


    if (isCurrentCartItemAlreadyExists) {
      const updateCount = await Cart.findOneAndUpdate(
        { _id: isCurrentCartItemAlreadyExists._id },
        {
          $set: {
            quantity: isCurrentCartItemAlreadyExists.quantity + 1,
          },
        },
        { new: true }
      );

      if (updateCount) {
        return NextResponse.json({
          success: true,
          message: "Product is added again to cart!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product to cart! Please try again.",
        });
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
