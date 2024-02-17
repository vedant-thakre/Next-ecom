import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import stripe from "stripe";
import { URL } from "url";

const stripeInstance = stripe(process.env.SECRET_KEY);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url:
          new URL("/checkout", process.env.NEXTAUTH_URL).toString() +
          "?status=success",
        cancel_url:
          new URL("/checkout", process.env.NEXTAUTH_URL).toString() +
          "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated.",
      });
    }
  } catch (error) {
    console.error("Error in checkout session creation:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}
