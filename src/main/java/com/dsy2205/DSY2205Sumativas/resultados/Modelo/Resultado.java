package com.dsy2205.DSY2205Sumativas.resultados.Modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class Resultado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Debe indicarse el ID del paciente")
    private Long pacienteId;

    @NotNull(message = "Debe indicar el tipo de análisis")
    @Size(min = 3, max = 100, message = "El tipo de análisis debe tener entre 3 y 100 caracteres")
    private String tipoAnalisis;

    @NotNull(message = "Debe ingresar un resultado")
    private String resultado;

    private Date fecha = new Date(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "laboratorio_id")
    private Laboratorio laboratorio;
}
