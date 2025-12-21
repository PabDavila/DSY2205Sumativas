import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl + '/usuarios';

  const mockUsuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@test.cl',
      password: '1234',
      rol: 'ADMIN'
    },
    {
      id: 2,
      nombre: 'Ana',
      apellido: 'Gómez',
      correo: 'ana@test.cl',
      password: '1234',
      rol: 'USER'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuariosComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe cargar los usuarios', () => {
    component.ngOnInit();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockUsuarios);

    expect(component.usuarios.length).toBe(2);
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('Debe eliminar usuario', () => {
    // precargamos usuarios
    component.usuarios = [...mockUsuarios];

    component.eliminarUsuario(1);

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

    expect(component.usuarios.length).toBe(1);
    expect(component.usuarios.find(u => u.id === 1)).toBeUndefined();
  });
});
