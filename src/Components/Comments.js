import { CircularProgress, Typography, TextField, Button, Divider, Avatar, Slide } from "@material-ui/core";
import { ArrowForwardIosRounded, ArrowDropDownRounded, ArrowDropUpRounded } from "@material-ui/icons";
import { useEffect, useState } from "react";
import fbRef from "../Database/firebase";
import { useStyles } from "../Views/Styles";
import firebase from "@firebase/app-compat";
import SnackBar from "./SnackBar";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Comments = (props) => {

    const [comments, setComments] = useState([]);
    const [commentsPending, setCommentsPending] = useState(true);
    const [comment, setComment] = useState('');
    const [loadComments, setLoadComments] = useState(false);
    const [commentPending, setCommentPending] = useState(false);
    const [state, setState] = useState({
        open: false,
        Transition: SlideTransition, 
    });
    const [reviewQuery, setReviewQuery] = useState(null);
    const [numComments, setNumComments] = useState(null);
    
    const handleClick = () => {
        console.log("state set");
        setState({ ...state, open: true });
    };

    const handleClose = () => {
        console.log("state unset");
        setState({ ...state, open: false });
    };
    
    const classes = useStyles();    
    
    const parentSlugs = props.parentSlugs;
    const parent = props.parent;
    const slug = props.slug;
    const id = props.id;
    const User = props.User;
    const SignIn = props.SignIn;

    const getComments = async ()=>{

        const slugQuery = await fbRef.db.collection(parentSlugs).doc(slug).get();
        const id = slugQuery.data().id;
        const ReviewQuery = fbRef.db.collection(parent).doc(id);
        setReviewQuery(ReviewQuery);

        const comments = [];
        const commentsSnapshots = await fbRef.db.collection(parent).doc(id).collection('comments').orderBy('createdAt', 'desc').get();
        commentsSnapshots.forEach(snapshot=>{
            comments.push({...snapshot.data(), key: snapshot.id});
        });
        setNumComments(commentsSnapshots.size);
        setComments(comments);
        setCommentsPending(false);    
    }

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){  
            getComments();          
            fbRef.db.collection(parent).doc(id).collection('comments').orderBy('createdAt', 'desc').onSnapshot(snapshot=>{
                    const comments = [];
                    snapshot.forEach(sp=>{
                        comments.push({...sp.data(), key: sp.id});
                    });
                    setComments(comments);
                }
            );
        }
        return ()=>{isMounted = false;}
    }, []);

    const commentSubmit = async (e)=>{
        e.preventDefault();
        setCommentPending(true);
        reviewQuery.collection('comments').add({
            comment: comment,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            username: User.displayName,
            photoURL: User.photoURL,
        })
        .catch(error=>console.log(error.message))
        .then(()=>{
            setComment('');
            setCommentPending(false);
            handleClick();
        })
    }

    return (
        <div>
            {User?
                numComments<=20?
                <div>
                    <form onSubmit={commentSubmit}>
                        <div style={{display: "flex", marginTop: 16}}>
                            <Avatar src={User.photoURL}/>
                            <Typography variant="body1" style={{marginLeft: 8, alignSelf: "center"}}>{User.displayName}</Typography>
                        </div>
                        <TextField value={comment} onChange={(e)=>{setComment(e.target.value);}} label="Write Comment" required inputProps={{maxLength: 500}} variant="outlined" multiline size="medium" fullWidth minRows={5} className={classes.TextField}/>
                        <Button style={{marginTop: 16}} disabled={commentPending} type="submit">{commentPending?"Adding...":"Comment"}<ArrowForwardIosRounded fontSize="large" color="secondary"/></Button>
                    </form>
                </div>
                :
                console.log(numComments)
            :
            <div style={{margin: 16}}>
                <a onClick={SignIn}>Sign in with Google to comment</a>
            </div>
            }
            <Button fullWidth style={{margin: 16}} onClick={()=>{setLoadComments(loadComments=>!loadComments)}}>Load Comments{loadComments?<ArrowDropUpRounded color="secondary" fontSize="large"/>:<ArrowDropDownRounded color="secondary" fontSize="large"/>}</Button>
            {loadComments?
                <div>           
                    <div style={{margin: 16}}>
                        <Typography variant="h2">Comments</Typography>
                        <Divider variant="middle"/>
                    </div>                    
                    {commentsPending?<CircularProgress color="secondary" className={classes.ProgressCircle} thickness={5}/>:
                    comments.map((comment)=>
                        <div key={comment.key} style={{display: "flex"}}>
                            <Avatar src={comment.photoURL} style={{alignSelf: "center", width: 64, height: 64}}/>
                            <div className={classes.Body} style={{textAlign: "left"}}>
                                <Typography variant="h4" className={classes.BlockText}>{comment.username}</Typography>
                                <Typography variant="body2" color="textSecondary">{comment.createdAt && new Date(parseInt(comment.createdAt['seconds'])*1000).toDateString()}</Typography>
                                <Typography variant="body1">{comment.comment}</Typography>
                            </div>
                        </div>
                    )}
                </div>
                :
                <div></div>
            }            
            <SnackBar handleClose={handleClose} state={state} message="Comment added! Reload page to see comment."/>
        </div>
    );
}
 
export default Comments;