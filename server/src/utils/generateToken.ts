import jwt from "jsonwebtoken";

export default function generateToken(id: string) {
  return jwt.sign(
    {
      id: id,
    },
    process.env.SECRET_KEY || "",
    {
      expiresIn: "7d",
    }
  );
}
