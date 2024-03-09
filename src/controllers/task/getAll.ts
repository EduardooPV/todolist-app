import { Request, Response } from "express";
import TaskModel from "../../models/task";
import UserModel from "../../models/user";

import { ZodError, z } from "zod";
import { createDeflate } from "zlib";

const getAll = async (req: Request, res: Response) => {
  const userParams = z.object({
    userId: z.string(),
  });

  try {
    const { userId } = userParams.parse(req.params);

    const userAlreadyExist = await UserModel.findOne({
      _id: userId,
    });

    if (!userAlreadyExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário não encontrado, verifique o id.",
      });
    }

    const tasks = await TaskModel.find({
      userId: userId,
    });

    const tasksFormatted = tasks.map((task) => ({
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
    }));

    return res.status(201).json({
      error: false,
      tasksFormatted,
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

export default getAll;
