import { TestBed } from '@angular/core/testing';
import { ResultadosComponent } from './resultados.component';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosComponent]
    }).compileComponents();

    component = TestBed.createComponent(ResultadosComponent).componentInstance;
  });

  it('Debe cargar los resultados', () => {
    component.ngOnInit();
    expect(component.resultados).toBeDefined();
  });

  it('Debe eliminar un resultado', () => {
  spyOn(component, 'eliminar').and.callThrough();
  component.eliminar(1);
  expect(component.eliminar).toHaveBeenCalledWith(1);
});

});
