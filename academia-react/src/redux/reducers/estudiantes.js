/* eslint-disable default-case */
import * as cursosTypes from '../types/estudiantes'

const initialState = {

    estudiantes: [
        {
            id: "",
            nombres: "",
            apellidos: "",
            dni: "",
            edad: 0
        }

    ]

}

export default function estudiantes(state = initialState, action) {
    switch (action.type) {
        case cursosTypes.GUARDAR_ESTUDIANTES:
            return {
                ...state,
                estudiantes: action.payload,
            }

        default:
            return state
    }
}