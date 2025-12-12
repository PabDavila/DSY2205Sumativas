import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultadosComponent } from './resultados.component';
import { environment } from '../../../environments/environment';

describe('ResultadosComponent', () => {

  let component: ResultadosComponent;
  let httpMock: HttpTestingController;

  const api = environment.apiUrl + '/resultados';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultadosComponent]
    });

    component = TestBed.inject(ResultadosComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('Debe cargar los resultados', () => {
    component.cargarResultados();

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');

    req.flush([{ id: 1, tipoAnalisis: "Hemograma" }]);

    expect(component.resultados.length).toBe(1);
  });

  it('Debe eliminar un resultado', () => {
    component.eliminar(1);

    const req = httpMock.expectOne(`${api}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});

    expect(true).toBeTrue();
  });
});
