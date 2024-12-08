import conexion from "../models/conexion.js";

export const getCargos = async (req, res) => {
    try {
        const selectQuery = `
            SELECT c.idCargo, c.nomCargo
            FROM cargo c
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar los cargos:', error);
        res.status(500).json({ error: 'Error al consultar los cargos' });
    }
};

export const postEmpleado = async (req, res) => {
    const { numCuenta, nombre, apellido, correo, activo, idCargo, contrasena } = req.body;
    try {
        const insertPersona = `
            INSERT INTO persona (numCuenta, nombre, apellido, correo, activo) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const insertEmpleado = `
            INSERT INTO empleado (numCuenta, idCargo)
            VALUES (?, ?)
        `;
        const insertLogin = `
            INSERT INTO login (numCuenta, contrasena)
            VALUES (?, ?)
        `;
        await conexion.query(insertPersona, [numCuenta, nombre, apellido, correo, activo]);
        await conexion.query(insertEmpleado, [numCuenta, idCargo]);
        await conexion.query(insertLogin, [numCuenta, contrasena]);

        res.status(201).json({ message: 'Empleado agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el empleado:', error);
        res.status(500).json({ error: 'Error al agregar el empleado' });
    }
};