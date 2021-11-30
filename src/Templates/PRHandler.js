import { useEffect, useState } from "react";
import fb from "../Database/firebase";
import { Slide } from "@material-ui/core";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const PRHandler = (collection, orderby) => {
    const [state, setState] = useState({
        open: false,
        Transition: SlideTransition,
    });
    const [Cards, setCards] = useState([]);
    const [CardsPending, setCardsPending] = useState(true);
    const [buttonStates, setButtonStates] = useState({left: 0, right: 1});
    const [firstVisible, setFirstVisible] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);

    const handleClick = (Transition, text) => () => {
        navigator.clipboard.writeText(text);
        setState({
            open: true,
            Transition,
        });
    }  
    
    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    }

    const handleNext = ()=>{
        setButtonStates({left:0, right:0});
        getCardslugs(1)
        .then(pageSnapshot=>setCardslugs(pageSnapshot));
    }

    const handlePrev = ()=>{
        setButtonStates({left:0, right:0});
        getCardslugs(-1)
        .then(pageSnapshot=>setCardslugs(pageSnapshot));
    }

    const setCardslugs = async (pageSnapshot)=>{
        const Cards = [];
        pageSnapshot.forEach((childSnapshot)=>{
            Cards.push({...childSnapshot.data(), key: childSnapshot.id});
        });
        setCards(Cards);
        setFirstVisible(pageSnapshot.docs[0]);
        setLastVisible(pageSnapshot.docs[pageSnapshot.docs.length - 1]);     
        setCardsPending(false);
    }

    const getCardslugs = async (direction)=>{
        const baseQuery = direction===0?
                            fb.db.collection(collection).orderBy(orderby).limit(5):
                            (direction===1?
                                fb.db.collection(collection).orderBy(orderby).startAfter(lastVisible).limit(5):
                                fb.db.collection(collection).orderBy(orderby).endBefore(firstVisible).limitToLast(5)
                            );
        const pageSnapshot = await baseQuery.get();
        return pageSnapshot;
    }

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){
            getCardslugs(0)
            .then(pageSnapshot=>setCardslugs(pageSnapshot));
        }
        return ()=> {isMounted=false}
    }, []);

    const handleButtonStates = async ()=>{ 
        if (firstVisible && lastVisible){      
            const prevQuery = fb.db.collection(collection).orderBy(orderby).limitToLast(1).endBefore(firstVisible);
            const nextQuery = fb.db.collection(collection).orderBy(orderby).limit(1).startAfter(lastVisible);
            const x = await prevQuery.get();
            const y = await nextQuery.get();
            setButtonStates({left: x.size?x.size/x.size:0, right: y.size?y.size/y.size:0});
        }
        else{
            setButtonStates({left: 0, right: 0});           
        }
    }

    useEffect(()=>{ 
        handleButtonStates();
    },[lastVisible, firstVisible]);

    return {Cards, state, CardsPending, buttonStates, handleClick, handleClose, handleNext, handlePrev}

}

export default PRHandler;