import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];


	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}
	
	addTarea(titulo:string,minutos:number) {
		// Llama al servicio para agregar una nueva tarea 
		this.service.addTarea(titulo,minutos,this.tareas);
	}

	seleccionarTarea(id: number, event: any) {
		//Se manda event como parametro para capturar si esta seleccionado el checkbox o no
		if (event.target.checked) {
		  this.tareas.find(tarea => tarea.id === id).seleccionado=true
		} else {
			this.tareas.find(tarea => tarea.id === id).seleccionado=false
		}
		/* Se utiliza la funcion find para encntrar la tarea que coincida con el id proporcionado como parametro
		y se cambia el valor de la variable "seleccionado" segun corresponda*/

		//console.log(this.tareas.find(tarea => tarea.id === id))
	  }

	  async deleteTarea(){
		// Llama al servicio para eliminar tarea seleccionadas
		this.tareas = await this.service.deleteTarea(this.tareas);
	 }
}
