import React, { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
const Formulario = ({ crearCita }) => {
	//Crear state de Citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	//Crear state de error
	const [error, actualizaError] = useState(false);

	// Función que se ejecuta cada vez que el usuario escribe en un input
	const actualizarState = (e) => {
		actualizarCita({ ...cita, [e.target.name]: e.target.value });
	};

	// Extraer los valores
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	// Cuando el usuario presiona el botón agregar cita
	const submitCita = (e) => {
		e.preventDefault();
		//validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actualizaError(true);
			return;
		}
		//Eliminar el mensaje previo
		actualizaError(false);
		//asignar un ID
		cita.id = uuid();
		//Crear la cita
		crearCita(cita);
		//Reiniciar el formulario
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});
	};
	return (
		<Fragment>
			<h2>Crear Cita</h2>

			{error ? (
				<p className='alerta-error'>Todos los campos son obligatorios</p>
			) : null}

			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					name='mascota'
					className='u-full-width'
					type='text'
					placeholder='nombre mascota'
					onChange={actualizarState}
					value={mascota}
				/>
				<label>Nombre Dueño</label>
				<input
					name='propietario'
					className='u-full-width'
					type='text'
					placeholder='nombre dueño de la mascota'
					onChange={actualizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input
					name='fecha'
					className='u-full-width'
					type='date'
					onChange={actualizarState}
					value={fecha}
				/>
				<label>Hora</label>
				<input
					name='hora'
					className='u-full-width'
					type='time'
					onChange={actualizarState}
					value={hora}
				/>
				<label>Sintomas</label>
				<textarea
					className='u-full-width'
					name='sintomas'
					onChange={actualizarState}
					value={sintomas}></textarea>
				<button className='u-full-width button-primary' type='submit'>
					Agregar Cita
				</button>
			</form>
		</Fragment>
	);
};
Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired,
};
export default Formulario;
