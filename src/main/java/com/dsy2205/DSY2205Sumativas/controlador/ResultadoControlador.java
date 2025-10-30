package com.dsy2205.demo.controlador;

import com.dsy2205.demo.modelo.Resultado;
import com.dsy2205.demo.repo.ResultadoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resultados")
@CrossOrigin(origins = "*")
public class ResultadoControlador {

    private final ResultadoRepository repo;

    public ResultadoControlador(ResultadoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Resultado> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Resultado> obtener(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PostMapping
    public Resultado crear(@RequestBody Resultado r) {
        return repo.save(r);
    }

    @PutMapping("/{id}")
    public Resultado actualizar(@PathVariable Long id, @RequestBody Resultado r) {
        r.setId(id);
        return repo.save(r);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
