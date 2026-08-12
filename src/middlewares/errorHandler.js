import { ErreurHttp } from "./ErreurHttp.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ErreurHttp) {
    res.status(err.statut).json({ erreur: err.message, details: err.details });
  } else {
    console.error(err);
    res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
};
