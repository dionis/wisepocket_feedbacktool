export class OpinionTest {
  id: string
  texto: string
  fecha: string
  polarityColor:string;
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
    switch (opinion.polaridad) {
      case 'positive':
        this.polarityColor = '#03a9f4';
        break;
    case 'positiva':
      this.polarityColor = '#03a9f4';
        break;
    case 'neutra':
      this.polarityColor = 'brown';
        break;
    case 'negativa':
      this.polarityColor = 'red';
        break;
    case 'negativa':
      this.polarityColor = 'red';
        break;
    default:
        break;
    }
    this.userend = opinion.userend;
  }
}