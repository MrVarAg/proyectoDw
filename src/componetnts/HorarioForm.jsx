// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';

const auth = getAuth(appFirebase);

const HorarioForm = () => {
    const [nombre, setNombre] = useState('');
    const [horaentrada, setHoraEntrada] = useState('');
    const [horasalida, setHoraSalida] = useState('');
    const [diainicio, setDiaInicio] = useState('');
    const [diafin, setDiaFin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/horarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, horaentrada, horasalida, diainicio, diafin }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Horario insertado con éxito');
                // Reiniciar los campos del formulario
                setNombre('');
                setHoraEntrada('');
                setHoraSalida('');
                setDiaInicio('');
                setDiaFin('');
            } else {
                alert(`Error al insertar horario: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar insertar el horario');
        }
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Usuario cerrado sesión exitosamente");
            alert("Sesión cerrada con éxito");
        }).catch((error) => {
            console.error("Error al cerrar sesión: ", error);
            alert("Hubo un error al intentar cerrar sesión");
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Hora de Entrada"
                    value={horaentrada}
                    onChange={(e) => setHoraEntrada(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Hora de Salida"
                    value={horasalida}
                    onChange={(e) => setHoraSalida(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Día de Inicio"
                    value={diainicio}
                    onChange={(e) => setDiaInicio(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Día de Fin"
                    value={diafin}
                    onChange={(e) => setDiaFin(e.target.value)}
                />
                <button type="submit">Insertar Horario</button>
            </form>
            <button onClick={handleLogout} style={{ marginTop: '10px' }}>Logout</button>
        </div>
    );
};

export default HorarioForm;
