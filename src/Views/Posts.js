/*
    The posts tab will be used to display all the posts from firebase db.
    Each post is got from the post component.
*/

import {CssBaseline, CircularProgress, Button, Container, Menu, MenuItem, Typography, muiske} from "@material-ui/core";
import fbRef from '../Database/firebase';
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Post from "../Components/Post";
import { useStyles } from "../Views/Styles";
import Footer from "../Components/Footer";
import Sort from '@material-ui/icons/Sort';

const Posts = () => {
    const classes = useStyles();
    const history = useHistory();
    const query = new URLSearchParams(window.location.search);
    
    const [posts, setPosts] = useState([]); //Current 'new' posts
    const [postPending, setPostPending] = useState(true); //Circular progress trigger
    const [last, setLast] = useState(null); //The last post to feed 'StartAfter'
    const [pageCount, setPageCount] = useState(0); //Number of batches of posts got
    const [postDivs, setPostDivs] = useState([]); //The loaded posts
    const [end, setEnd] = useState(false); //Remove scroll event listener on reaching end
    const [anchorEl, setAnchorEl] = useState(null);
    const [sort, setSort] = useState(query.get('sort')==='asc'?'asc':'desc');

    //Bottom scroll handler
    const onScroll = ()=>{        
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !postPending) {
            setPostPending(true);
            console.log(sort);
            getSnapshots(sort).then((pageSnapshot)=>{ 
                setNewPosts(pageSnapshot);                
            });
        }
    }

    //Sort Menu
    const sortMenu = (
        <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={()=>{setAnchorEl(null)}}
            >
            <MenuItem onClick={()=>{history.push({pathname: 'posts', search: '?sort=desc'});window.location.reload();}}>Newest first</MenuItem>
            <MenuItem onClick={()=>{history.push({pathname: 'posts', search: '?sort=asc'});window.location.reload();}}>Oldest first</MenuItem>
        </Menu>
    )
    
    //Post batch query to firestore.
    const setNewPosts = (pageSnapshot)=>{
        let newPosts = [];              
        if (!pageSnapshot.empty){
            pageSnapshot.forEach((childSnapshot)=>{
                newPosts.push({...childSnapshot.data()});
            });
            const lastChild = pageSnapshot.docs[pageSnapshot.docs.length - 1];
            setPosts(newPosts);
            setLast(lastChild);
            setPageCount(pageCount=>pageCount+1);
            setPostPending(false);
        }
        else{
            setEnd(true);
            setPostPending(false);
        }
    }

    //Get snapshot of each batch
    const getSnapshots = async (sort)=>{
        const baseQuery = fbRef.db.collection('posts').orderBy('createdAt', sort);
        const pageQuery = pageCount===0?baseQuery.limit(2):baseQuery.startAfter(last.data().createdAt).limit(2);
        const pageSnapshot = await pageQuery.get();
        return pageSnapshot;
    }

    //useEffect onMount
    useEffect(()=>{        
        let isMounted = true;
        window.addEventListener('popstate', (event) => {
            window.location.reload();
        });
        getSnapshots(sort).then((pageSnapshot)=>{
            if (isMounted){
                setNewPosts(pageSnapshot); 
            }
        })
        return ()=>{isMounted = false;}
    }, []);

    //useEffect to add Listener
    useEffect(()=>{
        if (!end){              
            window.addEventListener('scroll', onScroll, true);
        }
        return ()=>{window.removeEventListener('scroll', onScroll, true)};
    });

    //useEffect to add newPosts to already loaded list
    useEffect(()=>{
        setPostDivs((postDivs)=>[...postDivs, ...posts]);
        setPosts([]);
    }, [postPending]);

    return (
        <div>
            <CssBaseline/>
                <Container maxWidth='md'>
                    <Typography className={classes.Body} variant='h5'>You can find any picture that I share in <Typography className={classes.BlockText} variant='button'>posts</Typography></Typography>
                    <Button aria-controls="sort-menu" onClick={(e)=>setAnchorEl(e.currentTarget)} style={{marginTop: 16}}><Sort color='secondary' fontSize='large'/>Sort Posts</Button>
                    {sortMenu}
                    {postDivs.map((postdiv)=><div key={postdiv.id}><Post posts={postdiv}/></div>)}
                    {postPending?<div className={classes.ProgressCircle}><CircularProgress color='secondary' thickness={5}/></div>:
                        posts.map(post=><div key={post.id}><Post posts={post}/></div>)
                    }
                </Container>
        </div>
    );
}
 
export default Posts;