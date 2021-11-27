import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    //Global    
    Card:{
        margin: 32,
        borderRadius: 16,
        backgroundColor: theme.palette.primary.main,
    },
    //Home styles
    HomeRoot: {
        flexGrow: 1,      
    },
    Head: {
        color: 'background: linear-gradient(0deg, rgba(42,237,174,1) 0%, rgba(172,200,250,1) 100%);',
    },
    Body: {
        margin: 16,
        fontSize: 24,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 16,
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        padding: 16,
    },
    //Post styles
    ProgressCircle:{
        display: 'flex',
        justifyContent: 'center',
        margin: 32,
    },
    Image:{
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        width: '100%',        
        [theme.breakpoints.down('sm')]:{
            width: '100%',
        }
    },
    PostBox:{
        padding:16,
    },
    PostDate:{
        fontSize: 16,
        color: theme.palette.grey[500],
    },
    //Project styles
    Snackbar:{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
    },
    SnackbarRed:{
        backgroundColor: theme.palette.warning,
        color: theme.palette.primary.dark,
    },    
    FW:{
        float: 'right',
    },
    BW:{
        float: 'left',
    },    
    BlockText:{
        color: '#7de6c3',
        fontSize: 24,
    },
    TextField:{
        "& .MuiFormLabel-root":{
            color: 'white',
        },
        marginTop: 32,
    },
  }), {index: 1});