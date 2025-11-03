package com.dsy2205.DSY2205Sumativas.usuarios.Controlador;

import org.springframework.web.bind.annotation.*;

import com.dsy2205.DSY2205Sumativas.usuarios.Modelo.Usuario;
import com.dsy2205.DSY2205Sumativas.usuarios.Repo.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioControlador {

    private final UsuarioRepository repo;

    public UsuarioControlador(UsuarioRepository repo) {
        this.repo = repo;
    }

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        log.info("Solicitando lista de usuarios");
        List<Usuario> usuarios = repo.findAll();
        return ResponseEntity.ok(usuarios);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtener(@PathVariable Long id) {
        log.info("Buscando usuario con ID {}", id);
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("Usuario con ID {} no encontrado", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    // Crear usuario (con validaciones)
    @PostMapping
    public ResponseEntity<Usuario> crear(@Valid @RequestBody Usuario u) {
        log.info("Creando usuario con correo {}", u.getCorreo());
        Usuario nuevo = repo.save(u);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @Valid @RequestBody Usuario u) {
        log.info("Actualizando usuario con ID {}", id);
        return repo.findById(id)
                .map(existente -> {
                    u.setId(id);
                    Usuario actualizado = repo.save(u);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> {
                    log.warn("Intento de actualizar usuario inexistente con ID {}", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        log.info("Eliminando usuario con ID {}", id);
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            log.warn("Usuario con ID {} no encontrado para eliminar", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario user) {
        log.info("Intento de login con correo {}", user.getCorreo());
        Optional<Usuario> encontrado = repo.findByCorreoAndPassword(user.getCorreo(), user.getPassword());
        return encontrado
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("Login fallido para correo {}", user.getCorreo());
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }
}