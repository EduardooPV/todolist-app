import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { Request, Response, NextFunction } from "express";

interface IRequest extends Request {
  userLogged?: any;
}

const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: true, message: "Token não enviado." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({
      error: true,
      message: "Formato do Token inválido",
    });
  }

  const [scheme, token] = parts;

  if (scheme.indexOf("Bearer") !== 0) {
    return res.status(401).json({
      error: true,
      message: "Token mal formatado",
    });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY || "", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            error: true,
            message:
              "Token expirado. Faça login novamente para obter um novo token.",
          });
        } else {
          return res.status(401).json({
            error: true,
            message: "Token inválido.",
          });
        }
      }
      req.userLogged = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export default authenticate;
