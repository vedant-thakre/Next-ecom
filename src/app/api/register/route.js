import connectDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
});


export const dynamic = 'force-dynamic';


export async function POST(req){
    try {
        await connectDB();
        const { name, email, password, role } = await req.json();
        // validate the schema

        const { error } = schema.validate({name, email, password, role});

        if(error){
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
        if(isExist){
            return NextResponse.json(
              {
                success: false,
                message: "User Already Exists",
              },
              {
                status: 400,
              }
            );
        }

        const hashPass = await hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPass,
            role
        });

        if(newUser){
            return NextResponse.json(
              {
                success: true,
                message: `Registration Succussfull`,
              },
              {
                status: 200,
              }
            );
        }


    } catch (error) {
      return NextResponse.json({
            success: false,
            message: 'Internel Server Error',
        },{
            status: 500
        })
    }
}