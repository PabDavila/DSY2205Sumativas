package com.dsy2205.DSY2205Sumativas.usuarios.Modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
}
