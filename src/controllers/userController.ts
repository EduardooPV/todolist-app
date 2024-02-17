import { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
  res.status(201).json({
    error: false,
    status: "success",
    data: {
      name: "Teste",
    },
  });
};

export default { createUser };
