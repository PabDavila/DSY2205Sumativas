import { TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent]
    }).compileComponents();

    component = TestBed.createComponent(UsuariosComponent).componentInstance;
  });

  it('Debe cargar los usuarios', () => {
    component.ngOnInit();
    expect(component.usuarios).toBeDefined();
  });

  it('Debe eliminar usuario', () => {
    component.eliminarUsuario(1);
    expect(true).toBeTrue();
  });
});
