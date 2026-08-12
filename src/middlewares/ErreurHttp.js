export class ErreurHttp extends Error {
  constructor(statut, message, details = null) {
    super(message);
    this.name = "ErreurHttp";
    this.statut = statut;
    this.details = details;
  }
}
