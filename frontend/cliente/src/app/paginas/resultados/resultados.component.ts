import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resultado } from '../../models/resultado.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados: Resultado[] = [];
  api = environment.apiUrl + '/resultados';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarResultados();
  }

  listarResultados() {
    this.http.get<Resultado[]>(this.api).subscribe({
      next: (data) => this.resultados = data,
      error: () => console.log('Error al cargar resultados')
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este resultado?')) return;

    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => this.listarResultados(),
      error: () => alert('No se pudo eliminar el resultado')
    });
  }

}
