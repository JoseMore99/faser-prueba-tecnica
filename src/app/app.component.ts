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
	/*
	Estas variables serviran para saber si se debe hacer un ordenamiento
	ascendente(true) o descendente(false)
	*/
	ordenId: boolean;
	ordenTitulo: boolean;
	ordenminutis: boolean;
	ordenSeleccion: boolean;

	constructor(
		public service: AppService,
	) { }

	ngOnInit() {
		this.obtenerTareas();
		this.ordenId = true;
		this.ordenTitulo = true;
		this.ordenminutis = true;
		this.ordenSeleccion = true;
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	addTarea(titulo: string, minutos: number) {
		// Llama al servicio para agregar una nueva tarea 
		this.service.addTarea(titulo, minutos, this.tareas);
	}

	seleccionarTarea(id: number, event: any) {
		//Se manda event como parametro para capturar si esta seleccionado el checkbox o no
		if (event.target.checked) {
			this.tareas.find(tarea => tarea.id === id).seleccionado = true
		} else {
			this.tareas.find(tarea => tarea.id === id).seleccionado = false
		}
		/* Se utiliza la funcion find para encntrar la tarea que coincida con el id proporcionado como parametro
		y se cambia el valor de la variable "seleccionado" segun corresponda*/

		//console.log(this.tareas.find(tarea => tarea.id === id))
	}

	async deleteTarea() {
		// Llama al servicio para eliminar tarea seleccionadas
		this.tareas = await this.service.deleteTarea(this.tareas);
	}
	Ordenar(filtro: number) {
		// Si filtro = 1 se refiere al id, si es 2 hace referencia al titulo, si es a 3 a los minutos y si es 4 a seleccionado
		// Obtenemos la cantidad de tareas que hay  
		let n = this.tareas.length;
		//Usamos el metodo burbuja para hacer el ordenamiento
		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - 1 - i; j++) {
				if (filtro == 1) {//Acciones a realizar si es por id
					let A = this.tareas[j].id;
					let B = this.tareas[j + 1].id;

					//Segun si el valor de la variable ordenId, se realiza ascendente o descendente
					if (this.ordenId ? A > B : A < B) {
						let temp = this.tareas[j];
						this.tareas[j] = this.tareas[j + 1];
						this.tareas[j + 1] = temp;
					}
				} else if (filtro == 3) {//Acciones a realizar si es por minutos
					let A = this.tareas[j].minutos;
					let B = this.tareas[j + 1].minutos;

					//Segun si el valor de la variable ordenminutos, se realiza ascendente o descendente
					if (this.ordenminutis ? A > B : A < B) {
						let temp = this.tareas[j];
						this.tareas[j] = this.tareas[j + 1];
						this.tareas[j + 1] = temp;
					}
				} else if (filtro == 4) {//Acciones a realizar si es por Seleccion
					//Para seleccion el orden sera ya sea subiendo a los que estan todos los seleccionados o bajandolos 
					let A = this.tareas[j].seleccionado;
					let B = this.tareas[j + 1].seleccionado;

					//Segun si el valor de la variable ordenSeleccion, se realiza ascendente o descendente
					if (this.ordenSeleccion ? A > B : A < B) {
						let temp = this.tareas[j];
						this.tareas[j] = this.tareas[j + 1];
						this.tareas[j + 1] = temp;
					}
				} else if (filtro == 2) {//Acciones a realizar si es por titulo
					//Para titulo el orden sera por orden alfabetico
					let A = this.tareas[j].titulo;
					let B = this.tareas[j + 1].titulo;

					// Si es titulo se convertiran a minusculas para evitar problemas de orden
					if (typeof A === 'string') A = A.toLowerCase();
					if (typeof B === 'string') B = B.toLowerCase();
					//Segun si el valor de la variable ordenTitulo, se realiza ascendente o descendente
					if (this.ordenTitulo ? A > B : A < B) {
						let temp = this.tareas[j];
						this.tareas[j] = this.tareas[j + 1];
						this.tareas[j + 1] = temp;
					}
				}

			}
		}
		switch (filtro) {// Alternar orden para el siguiente ordenamiento
			case 1:
				this.ordenId = !this.ordenId;
				break;
			case 2:
				this.ordenTitulo = !this.ordenTitulo;
				break;
			case 3:
				this.ordenminutis = !this.ordenminutis;
				break;
			case 4:
				this.ordenSeleccion = !this.ordenSeleccion;
				break;
		}
	}

	destacarTarea() {
		//Se recorre la lista de tareas para ver cuales estan seleccionada y estas cambiar su atributo de destacado a true
		this.tareas.forEach(tarea => {
			if (tarea.seleccionado) {
				tarea.destacado = true;
			}
		});
	}
}
