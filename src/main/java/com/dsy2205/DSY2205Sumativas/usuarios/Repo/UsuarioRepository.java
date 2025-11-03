package com.dsy2205.DSY2205Sumativas.usuarios.Repo;

import com.dsy2205.DSY2205Sumativas.usuarios.Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoAndPassword(String correo, String password);
}
