import { CssBaseline, Typography, Container } from "@material-ui/core";
import notfound from "../public/notfound.png";

const NotFound = () => {
    return (
        <div>
            <CssBaseline/>
            <Container maxWidth="md" style={{ alignSelf: "center", marginTop: 64}}>
                <div style={{textAlign: "center", backgroundColor: "#272b31", padding: 16, borderRadius: 16}}>
                    <Typography variant='h2'>Error 404 Not Found</Typography>
                    <Typography variant="body2" style={{fontSize: 24}}>The URL that you requested for does not exist</Typography>
                    <img alt={"not found"} src={notfound} width="200" height="200" style={{borderRadius: 16, margin: 16}}/>
                </div>
            </Container>
        </div>
    );
}
 
export default NotFound;