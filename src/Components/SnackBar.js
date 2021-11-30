import { Snackbar, SnackbarContent } from "@material-ui/core";
import { useStyles } from "../Views/Styles";

const SnackBar = (props) => { 

    const classes = useStyles();    

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={props.state.open}
            onClose={props.handleClose}
            TransitionComponent={props.state.Transition}
            key={props.state.Transition.name}
        >
            <SnackbarContent message={props.message} className = {classes.Snackbar}/>
        </Snackbar>
    );
}
 
export default SnackBar;