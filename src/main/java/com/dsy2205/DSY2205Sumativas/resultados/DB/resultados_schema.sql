-- ====================================
-- CREACIÓN DE TABLAS DE LABORATORIOS Y RESULTADOS
-- ====================================

-- Eliminación segura
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE resultados CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE laboratorios CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/

-- Tabla LABORATORIOS
CREATE TABLE laboratorios (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    direccion VARCHAR2(150),
    telefono VARCHAR2(20)
);

-- Tabla RESULTADOS
CREATE TABLE resultados (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    paciente_id NUMBER NOT NULL,
    tipo_analisis VARCHAR2(100) NOT NULL,
    resultado VARCHAR2(255) NOT NULL,
    fecha DATE DEFAULT SYSDATE,
    laboratorio_id NUMBER,
    CONSTRAINT fk_resultado_laboratorio FOREIGN KEY (laboratorio_id)
        REFERENCES laboratorios (id)
);

-- ===============================
-- DATOS DE PRUEBA
-- ===============================
INSERT INTO laboratorios (nombre, direccion, telefono)
VALUES ('Laboratorio Central', 'Av. Salud 123, Santiago', '22223333');

INSERT INTO laboratorios (nombre, direccion, telefono)
VALUES ('Clínica Norte', 'Calle Bienestar 456, Valparaíso', '23234567');

INSERT INTO resultados (paciente_id, tipo_analisis, resultado, laboratorio_id)
VALUES (1, 'Hemograma completo', 'Valores normales', 1);

INSERT INTO resultados (paciente_id, tipo_analisis, resultado, laboratorio_id)
VALUES (2, 'Glucosa', '105 mg/dL', 2);

COMMIT;
