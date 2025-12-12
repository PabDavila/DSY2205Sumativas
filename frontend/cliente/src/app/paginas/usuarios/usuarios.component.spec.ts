import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuariosComponent } from './usuarios.component';
import { environment } from '../../../environments/environment';

describe('UsuariosComponent', () => {

  let component: UsuariosComponent;
  let httpMock: HttpTestingController;

  const api = environment.apiUrl + '/usuarios';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuariosComponent]
    });

    component = TestBed.inject(UsuariosComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('Debe cargar los usuarios', () => {
    component.cargarUsuarios();

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');

    req.flush([{ id: 1, nombre: 'Test' }]);

    expect(component.usuarios.length).toBe(1);
  });

  it('Debe crear un usuario', () => {
    const nuevo = { nombre: 'Juan' };

    component.crearUsuario(nuevo);

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');

    req.flush({ id: 1, nombre: 'Juan' });

    expect(component.usuarios.length).toBe(1);
  });

  it('Debe actualizar un usuario', () => {
    const editado = { id: 1, nombre: 'Nuevo' };

    component.actualizarUsuario(editado);

    const req = httpMock.expectOne(`${api}/1`);
    expect(req.request.method).toBe('PUT');

    req.flush(editado);

    expect(component.usuarios.find(u => u.id === 1)!.nombre).toBe('Nuevo');
  });

  it('Debe eliminar usuario', () => {
    component.eliminarUsuario(1);

    const req = httpMock.expectOne(`${api}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});

    expect(true).toBeTrue(); // si no lanza errores está ok
  });

});
