import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { loginStyle } from '../utils/styles'
import * as userActions from '../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { Alert } from '@material-ui/lab'

const useStyles = loginStyle()

function Login() {
  // Estados
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Hooks
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const storeUser = useSelector((state) => state.user)

  // Eventos
  function onChangeInput(type, e) {
    const value = e.target.value

    if (type === 'username') setUsername(value)
    if (type === 'password') setPassword(value)
  }

  // Funciones
  function initLogin(e) {
    e.preventDefault()

    const request = {
      username: username,
      password: password
    }

    dispatch(
      userActions.doLogin(
        request,
        () => {
          history.push('/cursos')
        }
      )
    )
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Ingresar al sistema en Heroku
          </Typography>
          {storeUser.error.error && (
            <Alert severity="warning">Nombre o usuario incorrectos</Alert>
          )}
          <form onSubmit={initLogin} className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Nombre de usuario'
              name='username'
              autoFocus
              onChange={(e) => onChangeInput('username', e)}
              value={username}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => onChangeInput('password', e)}
              value={password}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {storeUser.loading ? 'Cargando...' : 'Ingresar'}
            </Button>
            
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
