export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public seleccionado: boolean,//Se añadio una variable mas que permita saber si una variable esta seleccionada o no
        public destacado: boolean,//Se añadio una variable mas que permita saber si una tarea es destacada o no
    ){}
}