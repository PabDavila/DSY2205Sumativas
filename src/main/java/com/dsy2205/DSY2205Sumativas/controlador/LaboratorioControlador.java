package com.dsy2205.DSY2205Sumativas.controlador;

import org.springframework.web.bind.annotation.*;

import com.dsy2205.DSY2205Sumativas.modelo.Laboratorio;
import com.dsy2205.DSY2205Sumativas.repo.LaboratorioRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/laboratorios")
@CrossOrigin(origins = "*")
public class LaboratorioControlador {

    private final LaboratorioRepository repo;

    public LaboratorioControlador(LaboratorioRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Laboratorio> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Laboratorio> obtener(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PostMapping
    public Laboratorio crear(@RequestBody Laboratorio l) {
        return repo.save(l);
    }

    @PutMapping("/{id}")
    public Laboratorio actualizar(@PathVariable Long id, @RequestBody Laboratorio l) {
        l.setId(id);
        return repo.save(l);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
