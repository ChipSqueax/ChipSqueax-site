import { useStyles } from "../Views/Styles";
import { Button } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

const PRButtons = (props) => {

    const classes = useStyles();
    const buttonStates = props.buttonStates;
    const handleNext = props.handleNext;
    const handlePrev = props.handlePrev;
    const PRPending = props.PRPending;    

    return (
        <div style={{justifyContent: 'space-between'}}>
            {buttonStates.right?
            <div className={classes.FW}><Button onClick={handleNext} disabled={PRPending}>Next<ArrowForward fontSize='large' color='secondary'/></Button></div>:
            <div className={classes.FW}><Button onClick={handleNext} disabled={true}>Next<ArrowForward fontSize='large' color='secondary'/></Button></div>
            }
            {buttonStates.left?
            <div className={classes.BW}><Button onClick={handlePrev} disabled={PRPending}><ArrowBack fontSize='large' color='secondary'/>Previous</Button></div>:
            <div className={classes.BW}><Button onClick={handlePrev} disabled={true}><ArrowBack fontSize='large' color='secondary'/>Previous</Button></div>
            }
        </div>
    );
}
 
export default PRButtons;