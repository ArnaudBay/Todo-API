import express from "express";
import {
  validerIdTodo,
  validerCreationTodo,
  validerModificationTodo,
} from "../middlewares/todoValidationZod.js";
import { todoController } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", todoController.lister);
router.get("/:id", validerIdTodo, todoController.recuperer);
router.post("/", validerCreationTodo, todoController.creer);
router.put(
  "/:id",
  validerIdTodo,
  validerModificationTodo,
  todoController.modifier
);
router.delete("/:id", validerIdTodo, todoController.supprimer);

export const todoRoutes = router;