import { NextResponse } from "next/server";
import clientPromise from "@lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const wishlistItems = await db.collection("wishlist").find({}).toArray();
  return NextResponse.json(wishlistItems);
}

export async function POST(request) {
  const item = await request.json();
  const client = await clientPromise;
  const db = client.db("ecommerce");
  await db.collection("wishlist").insertOne(item);
  return NextResponse.json({ message: "Item added to wishlist" });
}

export async function DELETE(request) {
  const { label } = await request.json();
  const client = await clientPromise;
  const db = client.db("ecommerce");
  await db.collection("wishlist").deleteOne({ label: label });
  return NextResponse.json({ message: "Item removed from wishlist" });
}
