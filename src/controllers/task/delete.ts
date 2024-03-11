import { Request, Response } from "express";
import TaskModel from "../../models/task";

import { ZodError, z } from "zod";

const deleteTask = async (req: Request, res: Response) => {
  const taskParams = z.object({
    taskId: z.string(),
  });

  const userIdBody = z.object({
    userId: z.string(),
  });

  try {
    const { taskId } = taskParams.parse(req.params);
    const { userId } = userIdBody.parse(req.body);

    const deletedTask = await TaskModel.deleteOne({
      _id: taskId,
      userId: userId,
    });

    if (deletedTask.deletedCount === 0) {
      return res.status(400).json({
        error: true,
        message: "Tarefa não encontrada, verifique o id.",
      });
    }

    return res.status(201).json({
      error: false,
      message: "Tarefa excluida com sucesso.",
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

export default deleteTask;
