import { Request, Response } from "express";
import TaskModel from "../../models/task";
import UserModel from "../../models/user";

import { ZodError, z } from "zod";

const createTask = async (req: Request, res: Response) => {
  const taskBody = z.object({
    title: z
      .string({ required_error: "O campo Título é obrigatório." })
      .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
      .max(50, { message: "Nome deve ter menos que 50 caracteres." }),
    description: z
      .string({ required_error: "O campo Descrição é obrigatório." })
      .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
      .max(100, { message: "Nome deve ter menos que 100 caracteres." }),
    userId: z.string(),
  });

  try {
    const { title, description, userId } = taskBody.parse(req.body);

    const userAlreadyExist = await UserModel.findOne({
      _id: userId,
    });

    if (!userAlreadyExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário não encontrado, verifique o id.",
      });
    }

    const task = await TaskModel.create({
      title: title,
      description: description,
      status: false,
      user: userId,
    });

    return res.status(201).json({
      error: false,
      message: "Tarefa criada com sucesso!",
      task,
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

export default createTask;
