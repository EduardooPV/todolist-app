import { Request, Response } from "express";
import TaskModel from "../../models/task";

import { ZodError, z } from "zod";

const toggleTaskCompletion = async (req: Request, res: Response) => {
  const taskParams = z.object({
    taskId: z.string(),
  });

  const userIdBody = z.object({
    userId: z.string(),
  });

  const { taskId } = taskParams.parse(req.params);
  const { userId } = userIdBody.parse(req.body);

  try {
    const taskAlreadyExist = await TaskModel.findOne({
      _id: taskId,
      userId: userId,
    });

    if (!taskAlreadyExist) {
      return res.status(400).json({
        error: true,
        message: "Tarefa não encontrada, verifique o id.",
      });
    }

    const filter = { _id: taskId };
    const update = { status: !taskAlreadyExist.status };
    const options = { new: true };

    const updateTask = await TaskModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(201).json({
      error: false,
      message: `Tarefa alterada para ${
        updateTask?.status ? "concluida" : "em andamento"
      }.`,
      updateTask,
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

export default toggleTaskCompletion;
