import { useStyles } from "./Styles";
import { Button, Container, CssBaseline, Typography, Avatar } from "@material-ui/core";
import { LinkRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import blog from "../public/blog.png";
import review from "../public/review.png";
import post from "../public/post.png";
import about from "../public/about.png";

const Desc = (props)=>{
    const classes = useStyles();
    const path = props.path;
    const string = props.string;
    const header = props.header;
    const redirect = props.redirect;
    const align = props.align;
    return (
        <div style={{margin: 16, textAlign: align, backgroundColor: "#393E46", borderRadius: 32, padding: 16}}>
            <Button disableTouchRipple component={Link} to={redirect} style={{background: 'none', fontSize: 32, marginLeft: -8}}>
            <Avatar style={{marginRight: 8}}><img alt={header} width="100%" height="100%" src={path}/></Avatar><Typography variant="button" className={classes.BlockText}>{header}</Typography><LinkRounded fontSize="medium"/></Button>
            <Typography variant="body2" style={{fontSize: 20}}>{string}</Typography>
        </div> 
    )
}

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='md' style={{ alignSelf: "center", marginTop: 64}}>
                <div style={{
                        marginTop: 16,
                        backgroundColor: "#272b31",
                        borderRadius: 16,
                        textAlign: 'center',
                        color: "ffffff",
                        padding: 16,
                    }}
                >
                    <Typography variant='h2' className={classes.Head} style={{margin: 16}}>
                        Hello there!
                    </Typography>
                    <Typography variant='body2' style={{fontSize:24, margin:16}}>
                        This web document will give you a picture of who I am and what I do.
                        Here's some stuff you'll find here:
                    </Typography>
                    <div>
                        <Desc string = "Here, I'll be writing Blogs on topics that I find interesting" header="blog" path={`${blog}`} redirect="/blog" align="left"/>
                        <Desc string = "My reviews on books, software, video games...you'll find them here" header="reviews" path={`${review}`} redirect="/reviews" align="right"/>
                        <Desc string = "You can find any picture that I share in posts" header="posts" path={`${post}`} redirect="/posts" align="left"/>
                        <Desc string = "You'll find some very basic info about myself and how to contact me here" header="about" path={`${about}`} redirect="/about" align="right"/>                 
                    </div>
                    <Typography variant='body2' style={{fontSize:24, margin:16}}>
                        Thanks for visiting!
                    </Typography>                    
                </div>
            </Container>
        </div>    
    );
} 
export default Home;