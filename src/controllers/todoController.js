import { todoService } from "../services/todoService.js";
//import { ErreurHttp } from "../middlewares/ErreurHttp.js";

export const todoController = {
  lister(req, res) {
    res.json(todoService.lister());
  },

  recuperer(req, res, next) {
    try {
      const id = req.todoId;
      res.json(todoService.recuperer(id));
    } catch (err) {
      next(err);
    }
  },

  creer(req, res, next) {
    try {
      const todo = todoService.creer(req.body ?? {});
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  },

  modifier(req, res, next) {
    try {
      const id = req.todoId;
      const todo = todoService.modifier(id, req.body ?? {});
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  supprimer(req, res, next) {
    try {
      const id = req.todoId;
      todoService.supprimer(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
