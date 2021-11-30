import Slider from "react-slick";
import '../Views/slick-theme.css';
import '../Views/slick.css';
import { Box, Paper, Typography, Slide } from "@material-ui/core";
import { useStyles } from "../Views/Styles";


const Post = (props) => {
    const classes = useStyles();
    const post = props['posts'];

    const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,        
            adaptiveHeight: true,
            arrows: false,
    };

    return (
        <div>
            <div key={post.id}>
                <Slide in={true} timeout={500} direction='up'>
                <Paper elevation={3} className={classes.Card}>
                    <Slider {...sliderSettings}>
                        {   
                            post.downloadURLS.map((url)=>(                                
                                <div key={url}>
                                    <img alt={url} src={url} className={classes.Image}/>
                                </div>
                            ))
                        }   
                    </Slider>                     
                    <Box className={classes.PostBox}>
                        <Typography variant='body2' className={classes.PostDate}>{new Date(parseInt(post.createdAt['seconds'])*1000).toDateString()}</Typography>
                        <Typography variant='body2'>{post.body}</Typography>                        
                    </Box>                 
                </Paper>
                </Slide>
            </div>
        </div>
    );
}
 
export default Post;