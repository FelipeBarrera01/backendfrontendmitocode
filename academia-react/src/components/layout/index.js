import React from 'react'
import clsx from 'clsx'
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { layoutStyle } from '../../utils/styles';
import PeopleIcon from '@material-ui/icons/People';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../redux/actions/user'
import { Alert } from '@material-ui/lab';
import { changeStateAlert } from '../../redux/actions/ui';


const useStyles = layoutStyle()

function Layout(props) {
  const classes = useStyles();
  const history = useHistory()
  const ui = useSelector(state => state.ui);

  const [open, setOpen] = React.useState(true)

  const dispatch = useDispatch()


  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const goTo = (path) => {
    history.push(path)
  }

  const onSignOut = () => {
    history.push('/login')
    dispatch(userActions.signOut())
  }

  const handleClose = () => {
    dispatch(changeStateAlert(false, false, ""));
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={onSignOut}>
            Salir
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div>

          <ListItem onClick={() => goTo("/cursos")} button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Cursos"} />
          </ListItem>
          <ListItem onClick={() => goTo("/estudiantes")} button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Estudiantes"} />
          </ListItem>
          <ListItem onClick={() => goTo("/matriculas")} button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Matriculas"} />
          </ListItem>

        </div>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://material-ui.com/">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </main>
      {
        ui.issuccess ? (
          <Snackbar open={ui.state} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {ui.message}
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar open={ui.state} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {ui.message}
            </Alert>
          </Snackbar>
        )
      }

    </div>
  )
}

export default Layout
