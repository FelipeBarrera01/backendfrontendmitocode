

import http from '../../services/api';
import * as estudiantesTypes from '../types/estudiantes'
import { changeStateAlert } from './ui';

export const getEstudiantes = () => async (dispatch) => {

  const { data } = await http.get('/v2/estudiantes');
  dispatch({
    type: estudiantesTypes.GUARDAR_ESTUDIANTES,
    payload: data
  })

}

export const updateEstudiante = (estudiantes, estudiante) => {

  return async (dispatch) => {
    try {
      const { data } = await http.put(`/v2/estudiantes/${estudiante.id}`, estudiante);
      dispatch({
        type: estudiantesTypes.GUARDAR_ESTUDIANTES,
        payload: estudiantes.map(cur => {
          if (cur.id === estudiante.id) {

            cur.nombres = estudiante.nombres;
            cur.apellidos = estudiante.apellidos;
            cur.dni = estudiante.dni;
            cur.edad = estudiante.edad
            return cur;

          }
          return cur;
        }).sort(function(a, b){return b.edad -  a.edad})
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

 


}

export const eraseEstudiante = ( estudiantes, estudiante) => {

  return async (dispatch) => {
    try {
      const { data } = await http.delete(`/v2/estudiantes/${estudiante.id}`);
      dispatch({
        type: estudiantesTypes.GUARDAR_ESTUDIANTES,
        payload: estudiantes.filter(cur => cur.id !== estudiante.id)
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}

export const saveEstudiante = ( estudiantes, estudiante) => {

  return async (dispatch) => {
    try {
      const { data } = await http.post(`/v2/estudiantes`, {
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        dni: estudiante.dni,
        edad: estudiante.edad
      });
      estudiantes.push(data)
      
      dispatch({
        type: estudiantesTypes.GUARDAR_ESTUDIANTES,
        payload: estudiantes.sort(function(a, b){return b.edad -  a.edad})
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}