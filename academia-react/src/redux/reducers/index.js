import { combineReducers } from 'redux'
import user from './user'
import cursos from './cursos'
import estudiantes from './estudiantes';
import ui from './ui';
import matriculas from './matriculas';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    user,
    cursos,
    estudiantes,
    ui,
    matriculas,
    ...injectedReducers,
  })

  return rootReducer
}
