import { z } from "zod";
import { ErreurHttp } from "./ErreurHttp.js";





const idSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => Number.isInteger(val) && val > 0, {
    message: "L'identifiant doit etre un entier positif",
  });

const creationSchema = z.object({
  titre: z.string().nonempty("doit etre une chaine non vide"),
  termine: z.boolean().optional(),
});



const modificationSchema = z
  .object({
    titre: z.string().nonempty("doit etre une chaine non vide").optional(),
    termine: z.boolean().optional(),
  })
  .refine((data) => data.titre !== undefined || data.termine !== undefined, {
    message: "Au moins un champ doit etre fourni",
  });


      const enErreurHttp = (err, message) => {
        if (err instanceof z.ZodError) {
          const { fieldErrors, formErrors } = z.flattenError(err);
          const details = formErrors.length ? { ...fieldErrors, _: formErrors } : fieldErrors;
          return new ErreurHttp(400, message, details);
        }
        return err;
      };

export const validerIdTodo = (req, res, next) => {
  try {
    req.todoId = idSchema.parse(req.params.id);
    next();
  } catch (err) {
    next(enErreurHttp(err, "Identifiant invalide"));
  }
};




export const validerCreationTodo = (req, res, next) => {
  try {
    req.body = creationSchema.parse(req.body ?? {});
    next();
  } catch (err) {
    next(enErreurHttp(err, "Donnees invalides"));
  }
};

export const validerModificationTodo = (req, res, next) => {
  try {
    req.body = modificationSchema.parse(req.body ?? {});
    next();
  } catch (err) {
    next(enErreurHttp(err, "Donnees invalides"));
  }
};
