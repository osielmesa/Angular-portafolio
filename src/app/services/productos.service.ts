import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
	providedIn: 'root'
})
export class ProductosService {
	cargando = true;
	productos: ProductoInterface[] = [];
	productosFiltrado: ProductoInterface[] = [];
	constructor(private http: HttpClient) {
		this.cargarProductos();
	}

	private cargarProductos() {

		return new Promise((resolve, reject) => {
			this.http.get('https://angular-html-6e70f.firebaseio.com/productos_idx.json')
				.subscribe((res: ProductoInterface[]) => {
					this.cargando = false;
					this.productos = res;
					resolve();
				});
		});
	}

	getProducto(id: string) {
		return this.http.get(`https://angular-html-6e70f.firebaseio.com/productos/${id}.json`);
	}

	buscarProducto(termino: string) {
		if (this.productos.length === 0) {
			this.cargarProductos().then(() => {
				this.filtrarProductos(termino);
			});
		} else {
			this.filtrarProductos(termino);
		}
	}

	private filtrarProductos(termino: string) {
		this.productosFiltrado = [];
		this.productos.forEach(prod => {
			if (prod.categoria.toLowerCase().indexOf(termino.toLowerCase()) >= 0 || prod.titulo.toLowerCase().indexOf(termino.toLowerCase()) >= 0){
			this.productosFiltrado.push(prod);
		}
	});
}
}
