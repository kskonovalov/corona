import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topBar: {
            background: deepOrange[300]
        },
        title: {
            flexGrow: 1
        },
        button: {
            color: '#fff',
            borderColor: '#fff',
            '&:hover, &.active': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                background: '#fff',
                color: deepOrange[300],
            },
        },
        buttonGroup: {
            marginLeft: '20px'
        }
    })
);

export default useStyles;
