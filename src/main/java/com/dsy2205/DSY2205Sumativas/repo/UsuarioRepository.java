package com.dsy2205.demo.repo;

import com.dsy2205.demo.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoAndPassword(String correo, String password);
}
