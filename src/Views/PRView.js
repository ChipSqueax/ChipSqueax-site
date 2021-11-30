import { CircularProgress, Container, CssBaseline, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import fbRef from '../Database/firebase';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStyles } from "./Styles";

const PRView = (props) => {
    const classes = useStyles();
    const {slug} = useParams();
    const history = useHistory();

    const PRSlugs = props.PRSlugs;
    const PR = props.PR;

    const [markdown, setMarkdown] = useState('');
    const [markdownPending, setMarkdownPending] = useState(true);

    const getPR = (PRQuery)=>{
        const markdown = PRQuery.data().body;
        setMarkdown(markdown);
        setMarkdownPending(false);
    }

    const setQuery = async ()=>{
        const slugQuery = await fbRef.db.collection(PRSlugs).doc(slug).get();
        const id = slugQuery.data().id;
        const PRQuery = await fbRef.db.collection(PR).doc(id).get();
        return PRQuery;
    }

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){
            setQuery().then(res=>{
                getPR(res);
            }
            )
        }
        return ()=>{isMounted = false;}
    }, []);

    const handleGoBack = ()=>{
        history.push(`/${PR}`);
    }

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='md'>
                <Button onClick={handleGoBack} style={{marginTop: 16}}><ArrowBack color='secondary' fontSize='large'/>Go back</Button>
                {markdownPending?<div className={classes.ProgressCircle}><CircularProgress color='secondary' thickness={5}/></div>:
                    <div>
                    <div className="markdown">
                        <ReactMarkdown
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
                    </div>
                </div>
                }                
            </Container>
        </div>
    );
}
 
export default PRView;