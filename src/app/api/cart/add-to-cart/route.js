import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      //console.log(productID, userID);

      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productID,
        userID: userID,
      });

      //console.log(isCurrentCartItemAlreadyExists);

      if (isCurrentCartItemAlreadyExists?.length > 0) {
        const updateCount = await Cart.findByIdAndUpdate(
          {
            _id: isCurrentCartItemAlreadyExists[0]._id,
          },
          {
            productID: isCurrentCartItemAlreadyExists[0].productID,
            userID: isCurrentCartItemAlreadyExists[0].userID,
            quantity: isCurrentCartItemAlreadyExists[0].quantity + 1,
          },
          { new: true }
        );

        if (updateCount) {
          return NextResponse.json({
            success: true,
            message: "Product is added again to cart !",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "failed to add the product to cart ! Please try again.",
          });
        }
      }

      const saveProductToCart = await Cart.create(data);

      console.log(saveProductToCart);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to cart ! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
