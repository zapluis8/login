CREATE DATABASE login_db;
GO

USE login_db;
GO

--Tabla--
CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario VARCHAR(50),
    password VARCHAR(100)
);
GO

--Creando usuario--
INSERT INTO usuarios (usuario, password)
VALUES ('admin', '1234');
GO


--Ver tabla--
SELECT * FROM usuarios;
