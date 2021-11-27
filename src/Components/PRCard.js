import { Link } from "react-router-dom";
import { Avatar, Card, CardActionArea, CardHeader, CardActions, IconButton, Chip } from "@material-ui/core";
import { Share } from "@material-ui/icons";
import { useStyles } from "../Views/Styles";

const PRCard = (props) => {

    const card = props.card;
    const classes = useStyles();
    const handleClick = props.handleClick;
    const slideTransition = props.slideTransition;
    const parentPath = props.parentPath;
    const subheader = props.subheader;
    const tags = props.tags?props.tags.split(","):null;

    return (
        <div>            
            <Card className={classes.Card}>
                <CardActionArea component={Link} to={`${parentPath}/${card.key}`}>
                    <CardHeader
                        avatar={
                        <Avatar src={`${card.icon}`} style={{width: 64, height: 64}}/>
                        }
                        title={card.display}
                        subheader={subheader}
                        titleTypographyProps={{variant:'h3'}}
                        subheaderTypographyProps={{variant:'h6'}}
                    />
                    <div style={{marginLeft: 64}}>
                        {tags && tags.map(tag=>(<Chip label={tag} style={{margin: 8}}/>))}
                    </div>
                </CardActionArea> 
                <CardActions>
                    <IconButton aria-label="Copy link" onClick={handleClick(slideTransition,
                        `Check out this card!\n${window.location+'/'+card.key}`)}>
                        <Share color='secondary' fontSize='large'/>
                    </IconButton>
                </CardActions>                                        
            </Card>
        </div>
    );
}
 
export default PRCard;