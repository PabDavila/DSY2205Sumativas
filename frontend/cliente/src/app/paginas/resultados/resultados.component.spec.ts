import { TestBed } from '@angular/core/testing';
import { ResultadosComponent } from './resultados.component';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let serviceSpy: any;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ResultadosService', [
      'listar',
      'eliminar'
    ]);

    serviceSpy.listar.and.returnValue(of([
      {
        id: 1,
        pacienteId: 10,
        tipoAnalisis: 'Sangre',
        resultado: 'Normal'
      }
    ]));

    serviceSpy.eliminar.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [ResultadosComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'ResultadosService', useValue: serviceSpy }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe cargar los resultados', () => {
    expect(component.resultados.length).toBeGreaterThan(0);
  });

  it('Debe eliminar un resultado', () => {
    component.eliminar(1);
    expect(serviceSpy.eliminar).toHaveBeenCalledWith(1);
  });
});
