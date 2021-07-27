

import http from '../../services/api';
import * as cursosTypes from '../types/cursos'
import { changeStateAlert } from './ui';

export const getCursos = () => async (dispatch) => {

  const { data } = await http.get('/v2/cursos');
  dispatch({
    type: cursosTypes.GUARDAR_CURSOS,
    payload: data
  })

}

export const updateCurso = (cursos, curso) => {

  return async (dispatch) => {
    try {
      const { data } = await http.put(`/v2/cursos/${curso.id}`, curso);
      
      dispatch({
        type: cursosTypes.GUARDAR_CURSOS,
        payload: cursos.map(cur => {
          if (cur.id === curso.id) {

            cur.nombre = curso.nombre;
            cur.siglas = curso.siglas;
            cur.estado = curso.estado;
            return cur;

          }
          return cur;
        })
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

 


}

export const eraseCurso = ( cursos, curso) => {

  return async (dispatch) => {
    try {
      const { data } = await http.delete(`/v2/cursos/${curso.id}`);
      dispatch({
        type: cursosTypes.GUARDAR_CURSOS,
        payload: cursos.filter(cur => cur.id !== curso.id)
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}

export const saveCurso = ( cursos, curso) => {

  return async (dispatch) => {
    try {
      const { data } = await http.post(`/v2/cursos`, {
        nombre: curso.nombre,
        siglas: curso.siglas,
        estado: curso.estado
      });
      cursos.push(data)
      dispatch({
        type: cursosTypes.GUARDAR_CURSOS,
        payload: cursos
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}