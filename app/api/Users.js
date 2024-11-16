// /pages/api/Users.js
import { connectToDatabase } from "../../lib/mongodb"; // Example of MongoDB connection

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    // Save user to database
    const { formData } = JSON.parse(req.body);

    const { db } = await connectToDatabase();
    const user = await db.collection("users").insertOne(formData);

    if (user.acknowledged) {
      res
        .status(201)
        .json({ message: "User created successfully", user: user.ops[0] });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  } else if (method === "GET") {
    // Retrieve all users or specific user
    const { db } = await connectToDatabase();
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
