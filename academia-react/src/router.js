import {  Suspense, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Login from './pages/login'
import { getTokenSession } from './utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as userTypes from './redux/types/user'
import { CircularProgress } from '@material-ui/core'
import { Cursos } from './pages/Cursos'
import { Estudiantes } from './pages/Estudiantes'
import { Matriculas } from './pages/Matriculas'




function Loading() {
  return (
    <div className='centerLoading'>
      <CircularProgress />
    </div>
  )
}

function PrivateRoute(props) {
  const hasToken = getTokenSession()

  if (hasToken) {
    return <Route {...props} />
  }

  return <Redirect to='/login' />
}

function MainRouter() {
  // Estados
  const [isLoading, setIsLoading] = useState(true)

  // Hooks
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.user.authenticated)


  function validateAuth() {
    const hasToken = getTokenSession()

   

    if (hasToken && !authenticated) {
      dispatch({
        type: userTypes.DO_LOGIN_SUCESS,
        payload: hasToken
      })
    }
  }



  useEffect(() => {
   
    setIsLoading(false)
  }, [])

  useEffect(() => {
    validateAuth()
  }, [authenticated])

  return isLoading ? <Loading /> : (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/not-permisioned' component={() => <div>No tienes permisos</div>} />
          {authenticated && (
            <>

              <PrivateRoute exact path='/cursos' component={Cursos} />
              <PrivateRoute exact path='/estudiantes' component={Estudiantes} />
              <PrivateRoute exact path='/matriculas' component={Matriculas} />
              
             


            </>
          )}
        </Switch>
      </Suspense>
    </Router>
  )
}

export default MainRouter
