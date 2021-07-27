/* eslint-disable default-case */
import * as cursosTypes from '../types/cursos'

const initialState = {

    cursos: [
        {
            id: "",
            nombre: "",
            siglas: "",
            estado: false,
        }

    ],
    cursoSelected: {}

}

export default function cursos(state = initialState, action) {
    switch (action.type) {
        case cursosTypes.GUARDAR_CURSOS:
            return {
                ...state,
                cursos: action.payload,
            }

        default:
            return state
    }
}