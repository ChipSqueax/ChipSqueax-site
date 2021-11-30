import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useStyles } from "./Styles";

const About = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline/>
                <Container maxWidth="md" style={{marginTop: 64}}>
                <div style={{
                        marginTop: 16,
                        backgroundColor: "#272b31",
                        borderRadius: 16,
                        textAlign: 'center',
                        color: "ffffff",
                        padding: 16,
                    }}
                >
                    <Typography variant="h2" className={classes.Head} style={{margin: 16}}>About</Typography>
                    <div style={{margin: 16}}>
                        <Typography variant="body2" className={classes.BlockText}>
                            CS | ML | Minimalism | Stoicism
                        </Typography>
                        <Typography variant="body2" className={classes.Body}>
                            I'm a guy that has always loved learning about computers and working with them. Currently, I'm working towards improving my skills in Machine Learning.
                        </Typography>
                        <Typography variant="body2" className={classes.Body}>
                            I also like making video content during my free time and you can find my videos on my YouTube channel linked below.
                        </Typography>
                        <Typography variant="body2" className={classes.Body}>
                            You can reach me at<Button style={{background: 'none'}} disableRipple href="mailto:bharathkk0603@gmail.com"><Email color="secondary" fontSize="large"/></Button>
                        </Typography>                    
                    </div>
                </div>
            </Container>
        </div>        
    );
}
 
export default About;