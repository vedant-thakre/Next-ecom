import connectDB from "@/database";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

export const dynamic = "force-dynamic";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


export async function POST(req){
    try {
        await connectDB();
        const { email, password } = await req.json();

        const { error } = schema.validate({ email, password });

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

         // check if user exists or not
        const isExist = await User.findOne({email});
        if(!isExist){
            return NextResponse.json(
              {
                success: false,
                message: "User Doesn't Exists Please Register",
              },
              {
                status: 400,
              }
            );
        }

        const checkPass = await compare(password, isExist.password);
        if(!checkPass){
           return NextResponse.json(
              {
                success: false,
                message: "Incorrect Password",
              },
              {
                status: 400,
              }
            );
        }

        const token = jwt.sign({
          id: isExist?._id, email: isExist?.email, role: isExist?.role }, 
          'default_secret_key', 
          { expiresIn : '1d'}
        );

        const finalData = {
          token,
          user: {
            email: isExist.email,
            name: isExist.nmae,
            _id: isExist._id,
            role: isExist.role
          }
        }

        return NextResponse.json(
          {
            success: true,
            message: `Welcome Back ${isExist.name}`,
            data: finalData,
          },
          {
            status: 200,
          }
        );

    } catch (error) {
        console.log("Error : " ,error);
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