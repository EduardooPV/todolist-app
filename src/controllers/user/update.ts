import { Request, Response } from "express";
import UserModel from "../../models/user";

import { ZodError, z } from "zod";

const updateUser = async (req: Request, res: Response) => {
  try {
    const userDataBody = z.object({
      name: z
        .string({ required_error: "O campo Nome é obrigatório." })
        .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
        .max(30, { message: "Nome deve ter menos que 30 caracteres." }),
    });

    const userParams = z.object({
      userId: z.string(),
    });

    const { name } = userDataBody.parse(req.body);
    const { userId } = userParams.parse(req.params);

    try {
      const filter = { _id: userId };
      const update = { name };
      const options = { new: true };

      const updateUser = await UserModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      if (!updateUser) {
        res.status(400).json({
          error: true,
          message: "Usuário não encontrado.",
        });
      }

      res.status(201).json({
        error: false,
        updateUser,
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: "Erro ao atualizar o usuário.",
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Erro de validação, tente novamente.",
        details: error.errors.map((err) => err.message),
      });
    } else {
      return res.status(500).json({
        error: true,
        message:
          "Não foi possível se conectar ao servidor, tente novamente mais tarde.",
      });
    }
  }
};

export default updateUser;
