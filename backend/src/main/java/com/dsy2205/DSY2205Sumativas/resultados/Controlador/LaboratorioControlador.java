package com.dsy2205.DSY2205Sumativas.resultados.Controlador;

import org.springframework.web.bind.annotation.*;

import com.dsy2205.DSY2205Sumativas.resultados.Modelo.Laboratorio;
import com.dsy2205.DSY2205Sumativas.resultados.Repo.LaboratorioRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/laboratorios")
@CrossOrigin(origins = "*")
public class LaboratorioControlador {

    private final LaboratorioRepository repo;

    public LaboratorioControlador(LaboratorioRepository repo) {
        this.repo = repo;
    }

    // ✅ Listar laboratorios
    @GetMapping
    public ResponseEntity<List<Laboratorio>> listar() {
        log.info("Listando laboratorios");
        return ResponseEntity.ok(repo.findAll());
    }

    // Obtener laboratorio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Laboratorio> obtener(@PathVariable Long id) {
        log.info("Buscando laboratorio con ID {}", id);
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("Laboratorio con ID {} no encontrado", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    // Crear laboratorio
    @PostMapping
    public ResponseEntity<Laboratorio> crear(@Valid @RequestBody Laboratorio l) {
        log.info("Creando laboratorio: {}", l.getNombre());
        Laboratorio nuevo = repo.save(l);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // Actualizar laboratorio
    @PutMapping("/{id}")
    public ResponseEntity<Laboratorio> actualizar(@PathVariable Long id, @Valid @RequestBody Laboratorio l) {
        log.info("Actualizando laboratorio con ID {}", id);
        return repo.findById(id)
                .map(existente -> {
                    l.setId(id);
                    Laboratorio actualizado = repo.save(l);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> {
                    log.warn("Intento de actualizar laboratorio inexistente con ID {}", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    // Eliminar laboratorio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        log.info("Eliminando laboratorio con ID {}", id);
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Laboratorio con ID {} no encontrado para eliminar", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
