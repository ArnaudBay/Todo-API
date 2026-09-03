import { store } from "../data/store.js";
import { ErreurHttp } from "../middlewares/ErreurHttp.js";

const trouverIndex = (id) => store.todos.findIndex((t) => t.id === id);

export const todoService = {
  lister() {
    return store.todos;
  },

  recuperer(id) {
    const todo = store.todos.find((t) => t.id === id);
    if (!todo) {
      throw new ErreurHttp(404, `Todo ${id} introuvable`);
    }
    return todo;
  },

  creer({ titre, termine = false }) {
    const todo = {
      id: store.prochainId++,
      titre: titre.trim(),
      termine,
      creeLe: new Date().toISOString(),
    };
    store.todos.push(todo);
    return todo;
  },

  modifier(id, { titre, termine }) {
    const index = trouverIndex(id);
    if (index === -1) {
      throw new ErreurHttp(404, `Todo ${id} introuvable`);
    }

    const todo = store.todos[index];

    if (titre !== undefined) {
      todo.titre = titre.trim();
    }
    if (termine !== undefined) {
      todo.termine = termine;
    }

    return todo;
  },

  supprimer(id) {
    const index = trouverIndex(id);
    if (index === -1) {
      throw new ErreurHttp(404, `Todo ${id} introuvable`);
    }
    store.todos.splice(index, 1);
  },
};
