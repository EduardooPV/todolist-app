import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../../models/user";
import { ZodError, z } from "zod";
import generateToken from "../../utils/generateToken";

const loginUser = async (req: Request, res: Response) => {
  const userBody = z.object({
    email: z.string({ required_error: "O campo Email é obrigatório." }).email(),
    password: z
      .string({ required_error: "O campo Senha é obrigatório." })
      .min(4, { message: "A senha deve conter 4 ou mais caracteres." })
      .max(30, { message: "A senha deve ter menos que 30 caracteres." }),
  });

  const { email, password } = userBody.parse(req.body);

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    if (!password) {
      return res.status(401).json({
        error: true,
        message: "Senha não encontrada.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: true,
        message: "Senha incorreta, tente novamente.",
      });
    }

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    const token = generateToken(user._id.toString());

    return res.json({
      userWithoutPassword,
      token,
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

export default loginUser;
