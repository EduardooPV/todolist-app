import { Request, Response } from "express";
import UserModel from "../../models/user";

import { ZodError, z } from "zod";

const deleteUser = async (req: Request, res: Response) => {
  const userParams = z.object({
    userId: z.string(),
  });

  const { userId } = userParams.parse(req.params);

  try {
    const deletedUser = await UserModel.deleteOne({
      _id: userId,
    });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado ou já excluido.",
      });
    }

    res.status(200).json({
      error: false,
      message: "Usuário excluído com sucesso.",
    });
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

export default deleteUser;
