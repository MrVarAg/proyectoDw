import conexion from "../models/conexion.js";
import { auth, createUserWithEmailAndPassword } from "../../../src/log-credenciales.js";

export const postEmpleado = async (req, res) => {
    const { numCuenta, nombre, apellido, correo, activo, idCargo, contrasena } = req.body;
    try {
        console.log('Intentando crear usuario en Firebase Authentication...');
        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
        const user = userCredential.user;
        console.log('Usuario creado en Firebase Authentication:', user.uid);

        // Insertar datos en la base de datos
        const insertPersona = `
            INSERT INTO persona (numCuenta, nombre, apellido, correo, activo) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const insertEmpleado = `
            INSERT INTO empleado (numCuenta, idCargo)
            VALUES (?, ?)
        `;
        await conexion.query(insertPersona, [numCuenta, nombre, apellido, correo, activo]);
        await conexion.query(insertEmpleado, [numCuenta, idCargo]);

        res.status(201).json({ message: 'Empleado agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el empleado:', error);

        // Manejo de errores específicos de Firebase
        if (error.code && error.code.startsWith('auth/')) {
            res.status(400).json({ error: `Error de autenticación: ${error.message}` });
        } else {
            res.status(500).json({ error: 'Error al agregar el empleado' });
        }
    }
};