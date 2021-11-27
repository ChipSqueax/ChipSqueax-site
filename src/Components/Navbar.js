import React, { useEffect, useState } from 'react';
import { useStyles } from './Styles';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Menu, MenuItem, Button, Toolbar, AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {
  
  const classes = useStyles();
  const history = useHistory();
  
  const [value, setValue] = useState(0);  
  const [anchorEl, setAnchorEl] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);
  
  const handleClose = (path)=>{
      setAnchorEl(null);
      setTab(`${path}`);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setTab = (path)=>{
    if (new RegExp("/blog*").test(path)){
      setValue(1);
      return;      
    }
    else if(new RegExp("/reviews*").test(path)){
      setValue(2);
      return;
    }
    switch (path){
      case '/': setValue(0);break;
      case '/posts': setValue(3);break;
      case '/about': setValue(4);break;
      default: break;       
    }
  }

  useEffect(()=>{
    console.log('Use Effect called');
    let isMounted = true;
    if (isMounted){
      var path = window.location.pathname;
      setTab(path);
    }
    return ()=>{isMounted = false;}
  }, []);

  useEffect(()=>{
    return history.listen((location)=>{
      if (history.action === 'PUSH'){
        setLocationKeys([location.key]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys);
          setTab(location.pathname);
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ]);
          setTab(location.pathname);
        }
      }
      })
  }, [locationKeys]);
  
  const mobileMenu = (
      <Menu
        id="alt-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=>{setAnchorEl(null)}}
      >
        <MenuItem onClick={()=>handleClose('/blog')} component={Link} to={'/blog'}>Blog</MenuItem>
        <MenuItem onClick={()=>handleClose('/reviews')} component={Link} to={'/reviews'}>Reviews</MenuItem>
        <MenuItem onClick={()=>handleClose('/posts')} component={Link} to={'/posts'}>Posts</MenuItem>
        <MenuItem onClick={()=>handleClose('/about')} component={Link} to={'/about'}>About</MenuItem>
      </Menu>
  );

  return (
    <div>
      <AppBar position="sticky" className={classes.AppBar}>
        <Toolbar className={classes.Toolbar}>
            <Button onClick={()=>setTab("/")} component={Link} to={'/'} size='large' disableTouchRipple style={{background: 'none'}} className={classes.HomeButton}><Typography className={classes.GradientText}>ChipSqueax</Typography></Button>
            <Tabs value={value} className={classes.MainMenu} indicatorColor='secondary' onChange={handleChange}>
              <Tab label="Home" component={Link} to={'/'} className={classes.Tab}/>
              <Tab label="Blog" component={Link} to={'/blog'} className={classes.Tab}/>
              <Tab label="Reviews" component={Link} to={'/reviews'} className={classes.Tab}/>
              <Tab label="Posts" component={Link} to={'/posts'} className={classes.Tab}/>
              <Tab label="About" component={Link} to={'/about'} className={classes.Tab}/>
            </Tabs>          
          <IconButton color='inherit' aria-controls="alt-menu" onClick={(e)=>setAnchorEl(e.currentTarget)} className={classes.AltMenu}><MenuIcon fontSize='large'/></IconButton>
          {mobileMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
}