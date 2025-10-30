package com.dsy2205.demo.modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String correo;
    private String password;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;
}
