-- ===============================
-- CREACIÓN DE TABLAS DE USUARIOS
-- ===============================

-- Si existen, se eliminan para evitar conflictos al volver a ejecutar
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE usuarios CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/

-- Tabla USUARIOS
CREATE TABLE usuarios (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    correo VARCHAR2(100) UNIQUE NOT NULL,
    password VARCHAR2(100) NOT NULL
);

-- ===============================
-- DATOS DE PRUEBA
-- ===============================
INSERT INTO usuarios (nombre, correo, password) VALUES ('Administrador', 'admin@lab.com', 'admin123');
INSERT INTO usuarios (nombre, correo, password) VALUES ('Laboratorista', 'lab@lab.com', 'lab123');
INSERT INTO usuarios (nombre, correo, password) VALUES ('Paciente', 'paciente@correo.com', '1234');

COMMIT;
