import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
  company: Joi.string().required(),
  collection: Joi.string().required(),
});

export async function POST(req){
    try {
        await connectDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === "admin") {
          const extractData = await req.json();

          const {
            name,
            description,
            price,
            imageUrl,
            onSale,
            deliveryInfo,
            priceDrop,
            sizes,
            category,
            company,
            collection,
          } = extractData;

          const { error } = AddNewProductSchema.validate({
            name,
            description,
            price,
            imageUrl,
            onSale,
            deliveryInfo,
            priceDrop,
            sizes,
            category,
            company,
            collection,
          });

          if (error) {
            return NextResponse.json(
              {
                success: false,
                message: error.details[0].message,
              },
              {
                status: 400,
              }
            );
          }

          const newProduct = await Product.create(extractData);

          if (newProduct) {
            return NextResponse.json(
              {
                success: true,
                message: "Product Added Successfully",
              },
              {
                status: 200,
              }
            );
          } else {
            return NextResponse.json(
              {
                success: false,
                message: "Failed to add the product",
              },
              {
                status: 400,
              }
            );
          }
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "You're Not Authorized",
            },
            {
              status: 400,
            }
          );
        }
          

    } catch (error) {
        console.log("Error : ", error);
        return NextResponse.json(
        {
            success: false,
            message: "Internel Server Error",
        },
        {
            status: 500,
        }
        );
    }
}