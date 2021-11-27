import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useStyles } from "./Styles";

const About = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline/>
                <Container maxWidth="md" style={{marginTop: 128}}>
                <div className={classes.Body}>
                    <Typography variant="h1" style={{margin: 16}}>About</Typography>
                    <div style={{margin: 16}}>
                        <Typography variant="body2" className={classes.BlockText}>
                            CS | ML | Minimalism | Stoicism
                        </Typography>
                        <Typography variant="body2" className={classes.Body}>
                            Reach me at<Button style={{background: 'none'}} disableRipple href="mailto:bharathkk0603@gmail.com"><Email fontSize="large"/></Button>
                        </Typography>                    
                    </div>
                </div>
            </Container>
        </div>        
    );
}
 
export default About;