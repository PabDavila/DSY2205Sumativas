package com.dsy2205.DSY2205Sumativas.controlador;

import org.springframework.web.bind.annotation.*;

import com.dsy2205.DSY2205Sumativas.modelo.Usuario;
import com.dsy2205.DSY2205Sumativas.repo.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioControlador {

    private final UsuarioRepository repo;

    public UsuarioControlador(UsuarioRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Usuario> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> obtener(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario u) {
        return repo.save(u);
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario u) {
        u.setId(id);
        return repo.save(u);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PostMapping("/login")
    public Optional<Usuario> login(@RequestBody Usuario user) {
        return repo.findByCorreoAndPassword(user.getCorreo(), user.getPassword());
    }
}