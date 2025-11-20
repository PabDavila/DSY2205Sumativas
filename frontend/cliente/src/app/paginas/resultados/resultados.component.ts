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
    this.cargarResultados();
  }

  cargarResultados() {
    this.http.get<Resultado[]>(this.api).subscribe(data => {
      this.resultados = data;
    });
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar resultado?")) return;

    this.http.delete(`${this.api}/${id}`).subscribe(() => {
      this.cargarResultados();
    });
  }
}
