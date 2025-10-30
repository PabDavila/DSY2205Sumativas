package com.dsy2205.DSY2205Sumativas.modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Resultado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long pacienteId;
    private String tipoAnalisis;
    private String resultado;
    private java.sql.Date fecha;

    @ManyToOne
    @JoinColumn(name = "laboratorio_id")
    private Laboratorio laboratorio;
}
