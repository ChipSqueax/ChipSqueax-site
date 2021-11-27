import { CircularProgress, Container, CssBaseline, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import fbRef from '../Database/firebase';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStyles } from "./Styles";

const Project = () => {
    /*const classes = useStyles();
    const {slug} = useParams();
    const history = useHistory();
    

    const [markdown, setMarkdown] = useState('');
    const [markdownPending, setMarkdownPending] = useState(true);

    const getProject = async ()=>{
        const slugQuery = await fbRef.db.collection('projectSlugs').doc(slug).get();
        const id = slugQuery.data().id;
        const projectQuery = await fbRef.db.collection('projects').doc(id).get();
        const markdown = projectQuery.data().body;
        setMarkdown(markdown);
        setMarkdownPending(false);
    }

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){
            getProject();
        }
        return ()=>{isMounted = false;}
    }, []);

    const handleGoBack = ()=>{
        history.goBack();
    }*/

    return (
        <div></div>
        /*<div>
            <CssBaseline/>
            <Container maxWidth='md'>
                <Button onClick={handleGoBack} style={{marginTop: 16}}><ArrowBack color='secondary' fontSize='large'/>Go back</Button>
                {markdownPending?<div className={classes.ProgressCircle}><CircularProgress color='secondary' thickness={5}/></div>:
                    <ReactMarkdown
                        className='markdown'
                        children={markdown}
                        components={{
                            code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={a11yDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                                codeTagProps={{style: {fontWeight: 600, fontSize: 24}}}
                                />
                            ) : (
                                <code className={className} {...props}>
                                {children}
                                </code>
                            )
                            }
                        }}
                    />
                }
                <div className="Comments">
                    <Comments id={id} parentSlugs="reviewSlugs" parent="reviews" slug={slug} User={user} SignIn={signIn}/>
                </div>
            </Container>
        </div>*/
    );
}
 
export default Project;