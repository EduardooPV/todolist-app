import { Request, Response } from "express";
import TaskModel from "../../models/task";

import { ZodError, z } from "zod";

const update = async (req: Request, res: Response) => {
  const taskParams = z.object({
    taskId: z.string(),
  });

  const taskBody = z.object({
    title: z
      .string({ required_error: "O campo Título é obrigatório." })
      .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
      .max(50, { message: "Nome deve ter menos que 50 caracteres." }),
    description: z
      .string({ required_error: "O campo Descrição é obrigatório." })
      .min(1, { message: "Nome deve conter 1 ou mais caracteres." })
      .max(100, { message: "Nome deve ter menos que 100 caracteres." })
      .optional(),
  });

  try {
    const { taskId } = taskParams.parse(req.params);
    const { title, description } = taskBody.parse(req.body);

    console.log(title, description);

    const taskAlreadyExist = await TaskModel.findOne({
      _id: taskId,
    });

    if (!taskAlreadyExist) {
      return res.status(400).json({
        error: true,
        message: "Tarefa não encontrada, verifique o id.",
      });
    }

    const filter = { _id: taskId };
    const update = { title: title, description: description };
    const options = { new: true };

    const updateTask = await TaskModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(201).json({
      error: false,
      message: `Tarefa alterada para com sucesso.`,
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

export default update;
