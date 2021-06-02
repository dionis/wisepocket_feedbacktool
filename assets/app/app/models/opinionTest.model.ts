export class OpinionTest {
  id: string
  texto: string
  fecha: string
  polaridad: string;
  userend: {
    id: string,
    name_alias: string,
    email: string
  }
  constructor(opinion:any){
    this.id = opinion.id;
    this.texto = opinion.texto;
    this.fecha = opinion.fecha;
    this.polaridad = opinion.polaridad;
    this.userend = opinion.userend;
  }
}