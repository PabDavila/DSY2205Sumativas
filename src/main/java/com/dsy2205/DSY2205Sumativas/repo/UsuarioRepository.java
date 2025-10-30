package com.dsy2205.DSY2205Sumativas.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dsy2205.DSY2205Sumativas.modelo.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoAndPassword(String correo, String password);
}
