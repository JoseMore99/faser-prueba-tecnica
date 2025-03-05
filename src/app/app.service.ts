import { Injectable } from '@angular/core';
import { Tarea } from './tarea';

@Injectable()
export class AppService { 
    constructor(
        
    ) { }

    public async obtenerTareas() {
        try {
            var tareas: Tarea[] = [];
            tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15,false,false));
            tareas.push(new Tarea(2, 'Sacar la basura', 5,false,false));
            tareas.push(new Tarea(3, 'Cocinar la cena', 30,false,false));
            tareas.push(new Tarea(4, 'Lavar la ropa', 50,false,false));
            tareas.push(new Tarea(5, 'Regar las plantas', 20,false,false));
            return tareas;
        } catch (error) {
            return null;
        }
    }

    //Funcion para añadir una nueva tarea 
    public addTarea(titulo:string,minutos:number, tareas:Tarea[]) {
        try {
            // Se genera un nuevo id basado en el último disponible del listado de tareas 
            const nuevoId =  Math.max(...tareas.map(t => t.id)) + 1;
            //Se crea una nueva tarea y se inserta en el listado de tareas
            const nuevaTarea:Tarea = new Tarea(nuevoId,titulo,minutos,false,false);
            tareas.push(nuevaTarea);
            //console.log(tareas)
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    }
    
    //Funcion para eliminar una nueva tarea 
    public async deleteTarea(tareas:Tarea[]) {
        try {
            /*Se utiliza la funcion filter para obtener un nuevo array
            En este caso el nuevo array sera con todas las tareas no 
            seleccionadas  y las retorna*/
            tareas = tareas.filter(tarea => tarea.seleccionado==false);
            return tareas;
        } catch (error) {
            console.error('Error al eliminar una tarea:', error);
        }
    }
}