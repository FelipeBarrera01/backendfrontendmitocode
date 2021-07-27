import {  Button, Chip, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, Switch, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FaceIcon from '@material-ui/icons/Face';
import Layout from "../components/layout"
import { eraseMatricula, getMatriculas, saveMatricula, updateMatricula } from '../redux/actions/matriculas';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
export const Matriculas = () => {

    const dispatch = useDispatch();
    const matriculas = useSelector(state => state.matriculas);
    const estudiantes = useSelector(state => state.estudiantes);
    const cursos = useSelector(state => state.cursos)
    const [updateOrCreate, setUpdateOrCreate] = useState(false);
    const [open, setOpen] = useState(false);
    const [matriculaAux, setMatriculasAux] = useState({
        id: "",
        fecha_matricula: "",
        estudiante: {
            id: "",
            nombres: "",
            apellidos: "",
            dni: "",
            edad: 0
        },
        list_cursos: [],
        estado: false
    })
    const classes = useStyles();
    const [curs, setCurs] = useState("");
    const [estu, setStu] = useState("")
    useEffect(() => {
        loadMatriculas();
    }, []);

    const loadMatriculas = () => {
        dispatch(getMatriculas());
    }

    const createOrUpdate = (value, matricula) => {
        const option = {
            1: () => {
                setUpdateOrCreate(false);
                setOpen(true);
            },
            2: (matricula) => {
                setUpdateOrCreate(true);
                setOpen(true);
                setMatriculasAux(matricula);
                setStu(matricula.estudiante.nombres)
            }
        }

        option[value](matricula);
    }

    const assignValueMatricula = (e) => {
        setMatriculasAux({
            ...matriculaAux,
            [e.target.name]: e.target.value
        })
    }

    const putMatricula = () => {
        dispatch(updateMatricula(matriculas.matriculas, matriculaAux));
        setUpdateOrCreate(false);
        cancelMatricula();
    }
    const postMatricula = () => {
        dispatch(saveMatricula(matriculas.matriculas, matriculaAux));
        setUpdateOrCreate(false);
        cancelMatricula();
    }
    const deleteMatricula = (matricula) => {
        dispatch(eraseMatricula(matriculas.matriculas, matricula));
    }
    const assignEstudent = (e) => {
        matriculaAux.estudiante = e.target.value;
        setMatriculasAux(matriculaAux)
        setStu(e.target.value.nombres);
    }

    const assignCurso = (e) => {
        
        matriculaAux.list_cursos.push(e.target.value)
        setMatriculasAux(matriculaAux)
        setCurs(e.target.value.nombre)
    }
  
    const deleteOnCourse = (curso) => {
        setMatriculasAux({
            ...matriculaAux,
            list_cursos: matriculaAux.list_cursos.filter(cur => cur.id !== curso.id)
        })
    }
    const cancelMatricula = () => {
        setOpen(!open)
    setCurs("")
    setStu("");
    setMatriculasAux({
        id: "",
        fecha_matricula: "",
        estudiante: {},
        list_cursos: [],
        estado: false
    });
    }
    const body = (
        <div className="modalcursos">
            <div className="modalcursos__content">
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Fecha de matricula" name="fecha_matricula" value={matriculaAux.fecha_matricula} onChange={(e) => assignValueMatricula(e)} />
                </div>
                <div className="modalcursos__item-form">
                    <FormControl >
                        <InputLabel id="demo-simple-select-disabled-label">Estudiante</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={estu}
                            onChange={assignEstudent}
                            renderValue={(value) => `${value}`}
                        >
                            {
                                estudiantes.estudiantes.map(estu => (
                                    <MenuItem value={estu}>{estu.nombres}</MenuItem>
                                ))
                            }


                        </Select>




                    </FormControl>

                </div>
                <div className="modalcursos__item-form">
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={curs}
                        onChange={assignCurso}
                        renderValue={(value) => `${value}`}
                    >
                        {
                            cursos.cursos.map(cur => (
                                <MenuItem value={cur}>{cur.nombre}</MenuItem>
                            ))
                        }


                    </Select>
                </div>
                <div>
                    {matriculaAux.list_cursos.map(cur => (
                        <Chip
                        icon={<FaceIcon />}
                        label={cur.nombre}
                        onDelete={() => deleteOnCourse(cur)}
                      />
                    ))}
                </div>

                <div className="modalcursos__item-form">
                    Estado:
                    <Switch
                        checked={matriculaAux.estado}
                        onChange={() => setMatriculasAux({ ...matriculaAux, estado: !matriculaAux.estado })}
                        color="primary"
                    /></div>


                <div>
                    <Button variant="contained" onClick={cancelMatricula }>Cancelar</Button>
                    {
                        updateOrCreate ? (
                            <Button variant="contained" color="primary" onClick={putMatricula}>
                                Actualizar
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={postMatricula}>
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
                        matriculas.matriculas.map((matricula, index) => (
                            <div key={index} className="cursos__item">
                                <div className="cursos__item-text">{matricula.fecha_matricula}</div>
                                <div className="cursos__item-text">{matricula.estudiante.nombres}</div>
                                <div className="cursos__item-text">
                                    {matricula.list_cursos.map((cur, index) => (
                                        <label key={index}>{cur.nombre}, </label>

                                    ))}

                                </div>
                                <div className="cursos__item-text">{matricula.estado ? "true" : "false"}</div>
                                <div className="cursos__item-text" onClick={() => createOrUpdate(2, matricula)}>editar</div>
                                <div className="cursos__item-text" onClick={() => deleteMatricula(matricula)}>eliminar</div>
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
