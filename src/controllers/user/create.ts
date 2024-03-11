import { Request, Response } from "express";
import UserModel, { IUser } from "../../models/user";

import { ZodError, z } from "zod";
import generateToken from "../../utils/generateToken";

const createUser = async (req: Request, res: Response) => {
  const userDataSchema = z.object({
    name: z
      .string({ required_error: "O campo Nome é obrigatório." })
      .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
      .max(30, { message: "Nome deve ter menos que 30 caracteres." }),
    email: z.string({ required_error: "O campo Email é obrigatório." }).email(),
    password: z
      .string({ required_error: "O campo Senha é obrigatório." })
      .min(4, { message: "A senha deve conter 4 ou mais caracteres." })
      .max(30, { message: "A senha deve ter menos que 30 caracteres." }),
  });

  const userBody = userDataSchema.parse(req.body);

  try {
    const userAlreadyExist = await UserModel.findOne({
      email: userBody.email,
    });

    if (userAlreadyExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário já existente com esse email.",
      });
    }

    const user: IUser = await UserModel.create(userBody);

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    const token = generateToken(user._id);

    return res.status(201).json({
      error: false,
      message: "Usuário criado com sucesso!",
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
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

export default createUser;
