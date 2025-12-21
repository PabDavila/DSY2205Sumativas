import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosComponent } from './resultados.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Resultado } from '../../models/resultado.model';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl + '/resultados';

  const mockResultados: Resultado[] = [
    {
      id: 1,
      pacienteId: 10,
      tipoAnalisis: 'Sangre',
      resultado: 'Normal'
    },
    {
      id: 2,
      pacienteId: 11,
      tipoAnalisis: 'Orina',
      resultado: 'Observación'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResultadosComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe cargar los resultados', () => {
    component.ngOnInit();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockResultados);

    expect(component.resultados.length).toBe(2);
    expect(component.resultados).toEqual(mockResultados);
  });

  it('Debe eliminar un resultado', () => {
    component.resultados = [...mockResultados];

    component.eliminar(1);

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

    expect(component.resultados.length).toBe(1);
    expect(component.resultados.find(r => r.id === 1)).toBeUndefined();
  });
});
