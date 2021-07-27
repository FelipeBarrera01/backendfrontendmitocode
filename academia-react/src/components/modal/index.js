import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core"

function Modal(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth='xs'
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={props.onConfirm} variant='contained' color="primary">
          {props.buttonConfirmName}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
