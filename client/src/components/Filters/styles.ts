import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

export default makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: '7px 5px'
    },
    outlined: {
      borderColor: deepOrange[300]
    },
    selectWrap: {
      margin: '0 10px',
      position: 'relative',
      top: '3px'
    },
    inputWrap: {
      margin: '0 10px',
      position: 'relative',
      width: '50px',
      '& .MuiInput-underline:after': {
        borderColor: deepOrange[300]
      }
    },
    input: {
      fontSize: '2.125rem',
      textAlign: 'center',
      marginTop: '-11px'
    }
  })
);
