import express from "express";
import { todoController } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", todoController.lister);
router.get("/:id", todoController.recuperer);
router.post("/", todoController.creer);
router.put("/:id", todoController.modifier);
router.delete("/:id", todoController.supprimer);

export const todoRoutes = router;