package com.dsy2205.DSY2205Sumativas.modelo;

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

