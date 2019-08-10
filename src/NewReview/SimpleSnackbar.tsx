import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  }),
)

export default function SimpleSnackbar({
  toast,
  setToast,
}: {
  toast: string | null
  setToast: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const classes = useStyles()
  function handleClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === 'clickaway') return
    setToast(null)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!toast}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{toast}</span>}
      action={[
        // <Button key="undo" color="secondary" size="small" onClick={handleClose}>
        //   UNDO
        // </Button>,
        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}
