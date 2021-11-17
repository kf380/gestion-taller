import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'relative',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
      },
      palette: {
        primary: {
          main: '#0052cc',
        },
        secondary: {
          main: '#edf2ff',
        },
      },
  }));

  export default useStyles;
