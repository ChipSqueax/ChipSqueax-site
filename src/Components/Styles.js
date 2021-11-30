import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    //Navbar styles
    NavbarRoot: {
        flexGrow: 1,
    },
    AppBar: {
        minHeight: 128,
    },
    Toolbar: {
        minHeight: 128,
        flexGrow: 1,
    },
    MainMenu: {
        [theme.breakpoints.down('md')]:{
            display: 'none',
        },
        minHeight: 128,
        alignItems: 'flex-end',
    },
    AltMenu: {        
        [theme.breakpoints.up('lg')]:{
            display: 'none',
        },    
    },
    HomeButton: {        
        [theme.breakpoints.down('md')]:{
            fontSize: 32,
        },  
        flexGrow: 1,
        fontSize: 64,
    },
    Footer: {
        marginTop: 64,
        position: "relative",
        width: '100%',
        bottom: 0,
        borderTop: `5px dashed ${theme.palette.grey[600]}`,
        backgroundColor: theme.palette.primary.dark,
    },
    Tab: {
        fontSize: 32,
        minWidth: 16,
    },
    AccountAvatar: {
        alignSelf: "flex-end",
        margin: 8,
        [theme.breakpoints.down('md')]:{
            alignSelf: "center",
        },
    },
    GradientText:{
        [theme.breakpoints.down('md')]:{
            fontSize: 32,
        }, 
        fontSize: 64,
        background: "-webkit-linear-gradient(90deg, rgba(78,204,163,1) 0%, rgba(165,231,170,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
  }), {index: 1});