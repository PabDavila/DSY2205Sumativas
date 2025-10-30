package com.dsy2205.demo.modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Laboratorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String direccion;
    private String telefono;
}

