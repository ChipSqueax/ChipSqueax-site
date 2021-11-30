import { useStyles } from "./Styles";
import { YouTube, GitHub, Instagram } from "@material-ui/icons";
import { IconButton, Grid, Toolbar, Box, Typography } from "@material-ui/core";


const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.Footer}>
            <Toolbar className={classes.Toolbar} >
                <Grid container direction='row' justifyContent='center' spacing={2}>
                    <Grid item>                    
                        <IconButton color='inherit' href='https://www.youtube.com/channel/UCzwshHkHUhKFuYkvuTy5VAw'>
                            <YouTube fontSize='large'/>
                        </IconButton>
                    </Grid>
                    <Grid item>                    
                        <IconButton color='inherit' href='https://github.com/ChipSqueax'>
                            <GitHub fontSize='large'/>
                        </IconButton>
                    </Grid>
                    <Grid item>                    
                        <IconButton color='inherit'>
                            <Instagram fontSize='large'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
            <Typography style={{textAlign: "center", marginBottom: 32}}>
                @ 2021 ChipSqueax 
            </Typography>           
        </Box>
    );
}
 
export default Footer;