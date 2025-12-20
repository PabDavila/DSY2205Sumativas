import { TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let serviceSpy: any;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('UsuariosService', [
      'listar',
      'eliminarUsuario'
    ]);

    serviceSpy.listar.and.returnValue(of([
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@test.com',
        password: '1234'
      }
    ]));

    serviceSpy.eliminarUsuario.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [UsuariosComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'UsuariosService', useValue: serviceSpy }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe cargar los usuarios', () => {
    expect(component.usuarios.length).toBeGreaterThan(0);
  });

  it('Debe eliminar usuario', () => {
    component.eliminarUsuario(1);
    expect(serviceSpy.eliminarUsuario).toHaveBeenCalledWith(1);
  });
});
