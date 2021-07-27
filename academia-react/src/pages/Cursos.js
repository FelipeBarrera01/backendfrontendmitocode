import { Button, Modal, TextField, Switch } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout"
import { eraseCurso, getCursos, saveCurso, updateCurso } from "../redux/actions/cursos";

export const Cursos = () => {

    const dispatch = useDispatch();
    const cursos = useSelector(state => state.cursos);
    const [updateOrCreate, setUpdateOrCreate] = useState(false);
    const [open, setOpen] = useState(false);
    const [cursoAux, setCursoAux] = useState({
        estado: false,
        nombre: "",
        siglas: "",
        id: ""
    })

    useEffect(() => {
        loadCursos();
    }, []);

    const loadCursos = () => {
        dispatch(getCursos());
    }

    const createOrUpdate = (value, curso) => {
        const option = {
            1: () => {
                setUpdateOrCreate(false);
                setOpen(true);
            },
            2: (curso) => {
                setUpdateOrCreate(true);
                setOpen(true);
                setCursoAux(curso);
            }
        }

        option[value](curso);
    }

    const assignValueCurso = (e) => {
        setCursoAux({
            ...cursoAux,
            [e.target.name]: e.target.value
        })
    }

    const putCurso = () => {
        dispatch(updateCurso(cursos.cursos, cursoAux));
        setUpdateOrCreate(false);
        setOpen(false);
        setCursoAux({
            estado: false,
            nombre: "",
            siglas: "",
            id: ""
        });
    }
    const postCurso = () => {
        dispatch(saveCurso(cursos.cursos, cursoAux));
        setUpdateOrCreate(false);
        setOpen(false);
        setCursoAux({
            estado: false,
            nombre: "",
            siglas: "",
            id: ""
        });
    }
    const deleteCurso = (curso) => {
        dispatch(eraseCurso(cursos.cursos, curso));
    }
    const body = (
        <div className="modalcursos">
            <div className="modalcursos__content">
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Nombre" name="nombre" value={cursoAux.nombre} onChange={(e) => assignValueCurso(e)} />
                </div>
                <div className="modalcursos__item-form">
                    <TextField id="standard-basic" label="Siglas" name="siglas" value={cursoAux.siglas} onChange={(e) => assignValueCurso(e)} />
                </div>
                <div className="modalcursos__item-form">
                    Estado:
                    <Switch
                        checked={cursoAux.estado}
                        onChange={() => setCursoAux({ ...cursoAux, estado: !cursoAux.estado })}
                        color="primary"
                    />
                </div>

                <div>
                    <Button variant="contained" onClick={() => setOpen(!open)}>Cancelar</Button>
                    {
                        updateOrCreate ? (
                            <Button variant="contained" color="primary" onClick={putCurso}>
                                Actualizar
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={postCurso}>
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
                        cursos.cursos.map((curso, index) => (
                            <div key={index} className="cursos__item">
                                <div className="cursos__item-text">{curso.nombre}</div>
                                <div className="cursos__item-text">{curso.siglas}</div>
                                <div className="cursos__item-text">{curso.estado ? "true" : "false"}</div>
                                <div className="cursos__item-text" onClick={() => createOrUpdate(2, curso)}>editar</div>
                                <div className="cursos__item-text" onClick={() => deleteCurso(curso)}>eliminar</div>
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
