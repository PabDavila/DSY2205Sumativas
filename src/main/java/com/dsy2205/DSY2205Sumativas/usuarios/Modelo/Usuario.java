package com.dsy2205.DSY2205Sumativas.usuarios.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @Email(message = "El correo debe tener un formato válido")
    @NotNull(message = "El correo no puede ser nulo")
    private String correo;

    @NotNull(message = "La contraseña no puede ser nula")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    private String password;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;
}