import { useStyles } from "./Styles";
import { Container, CssBaseline, Typography } from "@material-ui/core";
const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='md' style={{marginTop: 128, alignSelf: "center"}}>
                <div style={{
                        marginTop: 16,
                        backgroundColor: "#272b31",
                        borderRadius: 16,
                        textAlign: 'center',
                        color: "ffffff",
                        padding: 16,
                    }}
                >
                    <Typography variant='h1' className={classes.Head} style={{margin: 16}}>
                        Hello there!
                    </Typography>
                    <Typography variant='body2' style={{fontSize:24, margin:16}}>
                        This web document will give you a picture of who I am and what I do.
                        Thanks for visiting😀.
                    </Typography>
                </div>
            </Container>
        </div>    
    );
} 
export default Home;