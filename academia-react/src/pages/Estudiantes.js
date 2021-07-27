import { Button, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eraseEstudiante, getEstudiantes, saveEstudiante, updateEstudiante } from '../redux/actions/estudiantes';
import Layout from "../components/layout"
export const Estudiantes = () => {

    const dispatch = useDispatch();
    const estudiantes = useSelector(state => state.estudiantes);
    const [updateOrCreate, setUpdateOrCreate] = useState(false);
    const [open, setOpen] = useState(false);
    const [estudianteAux, setEstudianteAux] = useState({
        id: "",
        nombres: "",
        apellidos: "",
        dni: "",
        edad: 0
    })

    useEffect(() => {
        loadEstudiantes();
    }, []);

    const loadEstudiantes = () => {
        dispatch(getEstudiantes());
    }

    const createOrUpdate = (value, estudiante) => {
        const option = {
            1: () => {
                setUpdateOrCreate(false);
                setOpen(true);
            },
            2: (estudiante) => {
                setUpdateOrCreate(true);
                setOpen(true);
                setEstudianteAux(estudiante);
            }
        }

        option[value](estudiante);
    }

    const assignValueEstudiante = (e) => {
        setEstudianteAux({
            ...estudianteAux,
            [e.target.name]: e.target.value
        })
    }

    const putEstudiante = () => {
        dispatch(updateEstudiante(estudiantes.estudiantes, estudianteAux));
        setUpdateOrCreate(false);
        setOpen(false);
        setEstudianteAux({
            id: "",
        nombres: "",
        apellidos: "",
        dni: "",
        edad: 0
        });
    }
    const postEstudiante = () => {
        dispatch(saveEstudiante(estudiantes.estudiantes, estudianteAux));
        setUpdateOrCreate(false);
        setOpen(false);
        setEstudianteAux({
            id: "",
        nombres: "",
        apellidos: "",
        dni: "",
        edad: 0
        });
    }
    const deleteEstudiante = (estudiante) => {
        dispatch(eraseEstudiante(estudiantes.estudiantes, estudiante));
    }
    const body = (
        <div className="modalcursos">
            <div className="modalcursos__content">
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Nombre" name="nombres" value={estudianteAux.nombres} onChange={(e) => assignValueEstudiante(e)} />
                </div>
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Apellidos" name="apellidos" value={estudianteAux.apellidos} onChange={(e) => assignValueEstudiante(e)} />
                </div>
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Dni" name="dni" value={estudianteAux.dni} onChange={(e) => assignValueEstudiante(e)} />
                </div>
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Edad" name="edad" value={estudianteAux.edad} onChange={(e) => assignValueEstudiante(e)} />
                </div>
                

                <div>
                    <Button variant="contained" onClick={() => setOpen(!open)}>Cancelar</Button>
                    {
                        updateOrCreate ? (
                            <Button variant="contained" color="primary" onClick={putEstudiante}>
                                Actualizar
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={postEstudiante}>
                                Guardar
                            </Button>
                        )
                    }


                </div>

            </div>
        </div>
    )
    return (
        <Layout>
            <div className="cursos">

                <Button variant="contained" color="primary" onClick={() => createOrUpdate(1)}>
                    +
                </Button>
                <div className="cursos__list">
                    {
                        estudiantes.estudiantes.map((estudiante, index) => (
                            <div key={index} className="cursos__item">
                                <div className="cursos__item-text">{estudiante.nombres}</div>
                                <div className="cursos__item-text">{estudiante.apellidos}</div>
                                <div className="cursos__item-text">{estudiante.dni}</div>
                                <div className="cursos__item-text">{estudiante.edad}</div>
                                <div className="cursos__item-text" onClick={() => createOrUpdate(2, estudiante)}>editar</div>
                                <div className="cursos__item-text" onClick={() => deleteEstudiante(estudiante)}>eliminar</div>
                            </div>
                        ))
                    }


                </div>


                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>

        </Layout>

    )
}
