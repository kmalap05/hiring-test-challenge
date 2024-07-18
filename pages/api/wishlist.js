import clientPromise from "@lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { product } = req.body;

    // console.log("Received product:", product); // Log received product

    try {
      const client = await clientPromise;
      const db = client.db("ecommerce");
      // console.log("Database connection established"); // Log successful connection

      const result = await db.collection("wishlist").insertOne(product);
      // console.log("Insert result:", result); // Log insert result

      res.status(200).json({ message: "Product added to wishlist!" });
    } catch (error) {
      // console.error("Error adding product to wishlist:", error);
      res.status(500).json({ error: "Error adding product to wishlist" });
    }
  } else if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("ecommerce");

      const wishlistItems = await db.collection("wishlist").find({}).toArray();

      res.status(200).json(wishlistItems);
    } catch (error) {
      // console.error("Error retrieving wishlist items:", error);
      res.status(500).json({ error: "Error retrieving wishlist items" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
