package com.dsy2205.DSY2205Sumativas.resultados.Controlador;

import org.springframework.web.bind.annotation.*;

import com.dsy2205.DSY2205Sumativas.resultados.Modelo.Resultado;
import com.dsy2205.DSY2205Sumativas.resultados.Repo.ResultadoRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/resultados")
@CrossOrigin(origins = "*")
public class ResultadoControlador {

    private final ResultadoRepository repo;

    public ResultadoControlador(ResultadoRepository repo) {
        this.repo = repo;
    }

    //Listar resultados
    @GetMapping
    public ResponseEntity<List<Resultado>> listar() {
        log.info("Listando resultados clínicos");
        return ResponseEntity.ok(repo.findAll());
    }

    //Obtener resultado por ID
    @GetMapping("/{id}")
    public ResponseEntity<Resultado> obtener(@PathVariable Long id) {
        log.info("Buscando resultado con ID {}", id);
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("Resultado con ID {} no encontrado", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    //Crear resultado
    @PostMapping
    public ResponseEntity<Resultado> crear(@Valid @RequestBody Resultado r) {
        log.info("Creando resultado para paciente {} en laboratorio {}", r.getPacienteId(),
                r.getLaboratorio() != null ? r.getLaboratorio().getId() : "sin laboratorio");
        Resultado nuevo = repo.save(r);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    //Actualizar resultado
    @PutMapping("/{id}")
    public ResponseEntity<Resultado> actualizar(@PathVariable Long id, @Valid @RequestBody Resultado r) {
        log.info("Actualizando resultado con ID {}", id);
        return repo.findById(id)
                .map(existente -> {
                    r.setId(id);
                    Resultado actualizado = repo.save(r);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> {
                    log.warn("Resultado con ID {} no encontrado para actualizar", id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
    }

    //Eliminar resultado
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        log.info("Eliminando resultado con ID {}", id);
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Resultado con ID {} no encontrado para eliminar", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
