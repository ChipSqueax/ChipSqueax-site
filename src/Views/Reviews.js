import { CssBaseline, CircularProgress, Container, Slide, Typography } from "@material-ui/core";
import { useStyles } from "./Styles";
import SnackBar from "../Components/SnackBar";
import PRCard from "../Components/PRCard";
import PRHandler from "../Templates/PRHandler";
import PRButtons from "../Components/PRButtons";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Reviews = () => {
    const classes = useStyles();

    const {Cards: reviews, state, CardsPending: reviewsPending, buttonStates, handleClick, handleClose, handleNext, handlePrev} = PRHandler('reviewSlugs', 'display');

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='md'>
            <Typography variant='h5' className={classes.Body}>
                My <Typography className={classes.BlockText} variant='button'>reviews</Typography> on books, software, video games...you'll find them here. 
            </Typography>
            {reviewsPending?<div className={classes.ProgressCircle}><CircularProgress color='secondary' thickness={5}/></div>:
            reviews.map(review=>(
                <div key = {review.key}>
                    <PRCard card={review} subheader={new Date(parseInt(review.createdAt['seconds'])*1000).toDateString()} parentPath='reviews' handleClick={handleClick} slideTransition={SlideTransition}/>
                </div>
            )
            )}
            <PRButtons buttonStates={buttonStates} handleNext={handleNext} handlePrev={handlePrev} PRPending={reviewsPending}/>
            <SnackBar message="Link copied to clipboard!" state={state} handleClose={handleClose}/>
        </Container>
        </div>
    );
}
 
export default Reviews;