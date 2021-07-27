/* eslint-disable default-case */
import * as matriculasTypes from '../types/matriculas'

const initialState = {

    matriculas: [
        {
            id: "",
            fecha_matricula: "",
            estudiante: {},
            list_cursos: [],
            estado: false
        }

    ]

}

export default function matriculas(state = initialState, action) {
    switch (action.type) {
        case matriculasTypes.GUARDAR_MATRICULAS:
            return {
                ...state,
                matriculas: action.payload,
            }

        default:
            return state
    }
}