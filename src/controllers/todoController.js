import { todoService } from "../services/todoService.js";
import { ErreurHttp } from "../middlewares/ErreurHttp.js";

const analyserId = (valeur) => {
  const id = Number(valeur);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErreurHttp(400, "L'identifiant doit être un entier positif");
  }
  return id;
};

export const todoController = {
  lister(req, res) {
    res.json(todoService.lister());
  },

  recuperer(req, res, next) {
    try {
      const id = analyserId(req.params.id);
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
      const id = analyserId(req.params.id);
      const todo = todoService.modifier(id, req.body ?? {});
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  supprimer(req, res, next) {
    try {
      const id = analyserId(req.params.id);
      todoService.supprimer(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
