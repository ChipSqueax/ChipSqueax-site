import { CssBaseline, CircularProgress, Container, Slide, Typography } from "@material-ui/core";
import { useStyles } from "./Styles";
import SnackBar from "../Components/SnackBar";
import PRCard from "../Components/PRCard";
import PRHandler from "../Templates/PRHandler";
import PRButtons from "../Components/PRButtons";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Projects = () => {
    const classes = useStyles();

    const {Cards: blog, state, CardsPending: blogPending, buttonStates, handleClick, handleClose, handleNext, handlePrev} = PRHandler('blogSlugs', 'display');

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='md'>
            <Typography variant='h5' className={classes.Body}>
                I'll be writing <Typography className={classes.BlockText} variant='button'>Blogs</Typography> on topics that I find interesting.
            </Typography>
            {blogPending?<div className={classes.ProgressCircle}><CircularProgress color='secondary' thickness={5}/></div>:
            blog.map(b=>(
                <div key = {b.key}>
                    <PRCard card={b} subheader={new Date(parseInt(b.createdAt["seconds"])*1000).toDateString()} tags={b.tags} parentPath='blog' handleClick={handleClick} slideTransition={SlideTransition}/>
                </div>
            )
            )}
            <PRButtons buttonStates={buttonStates} handleNext={handleNext} handlePrev={handlePrev} PRPending={blogPending}/>
            <SnackBar message="Link copied to clipboard!" state={state} handleClose={handleClose}/>
        </Container>
        </div>
    );
}
 
export default Projects;