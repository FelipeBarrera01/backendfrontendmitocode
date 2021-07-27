

import http from '../../services/api';
import * as matriculasTypes from '../types/matriculas'
import { changeStateAlert } from './ui';

export const getMatriculas = () =>  {
return async (dispatch) => {
    const { data } = await http.get('/v2/matriculas');
    dispatch({
      type: matriculasTypes.GUARDAR_MATRICULAS,
      payload: data
    })
}
  

}

export const updateMatricula = (matriculas, matricula) => {

  return async (dispatch) => {
    try {
      const { data } = await http.put(`/v2/matriculas/${matricula.id}`, matricula);
      console.log(data);
      dispatch({
        type: matriculasTypes.GUARDAR_MATRICULAS,
        payload: matriculas.map(cur => {
          if (cur.id === matricula.id) {

            cur.fecha_matricula = matricula.fecha_matricula;
            cur.estado = matricula.estado;
            cur.estudiante = matricula.estudiante;
            cur.list_cursos = matricula.list_cursos
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

export const eraseMatricula = ( matriculas, matricula) => {

  return async (dispatch) => {
    try {
      const { data } = await http.delete(`/v2/matriculas/${matricula.id}`);
      dispatch({
        type: matriculasTypes.GUARDAR_MATRICULAS,
        payload: matriculas.filter(cur => cur.id !== matricula.id)
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}

export const saveMatricula = ( matriculas, matricula) => {

  return async (dispatch) => {
    try {
      const { data } = await http.post(`/v2/matriculas`, {
        fecha_matricula: matricula.fecha_matricula,
        estudiante: matricula.estudiante,
        list_cursos: matricula.list_cursos,
        estado: matricula.estado
      });
      matriculas.push(data)
      
      dispatch({
        type: matriculasTypes.GUARDAR_MATRICULAS,
        payload: matriculas
      })
      dispatch(changeStateAlert(true, true, "Acción ejecutada correctamente"));
    } catch (error) {
      dispatch(changeStateAlert(true,false, "Acción no se ejecutó correctamente"));
    }
  }

}