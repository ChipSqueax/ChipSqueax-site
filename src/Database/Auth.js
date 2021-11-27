import { useEffect, useState } from "react";
import fbRef from "./firebase";

const Auth = ()=>{

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){
            fbRef.auth.onAuthStateChanged(user=>{
                if (user){
                    setUser(user);
                }
                else{
                    console.log("Logged out");
                }
            });
        }
        return ()=>{isMounted=false;}
    }, []);

    const signIn = ()=>{
        fbRef.auth.signInWithRedirect(fbRef.provider);
    }
    
    const signInResult = ()=>{    
        fbRef.auth.getRedirectResult()
        .then(result=>{
            console.log("nice");
            setUser(result.user);       
        })
        .catch(error=>{
            setError(error.message);
        });
    }
    
    const signOut = ()=>{
        fbRef.auth.signOut()
        .then(()=>{
            setUser(null);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    return {user, error, signIn, signOut};
}

export default Auth;
