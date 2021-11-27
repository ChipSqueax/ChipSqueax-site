import { ThemeProvider, createTheme } from "@material-ui/core";
import Footer from "./Components/Footer.js";
import Navbar from "./Components/Navbar.js";
import Home from "./Views/Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./Views/Blog.js";
import Posts from "./Views/Posts.js";
import About from "./Views/About.js";
import Reviews from "./Views/Reviews.js";
import NotFound from "./Views/NotFound.js";
import PRView from "./Views/PRView.js";
import './App.css';
import bg from './public/bg.png';

function App() {
  const darkTheme = createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${bg})`,
            backgroundPosition: '50% 50%',
          },
        },
      },
    },   
    palette:{
      type: 'dark',
      primary: {
        main: '#393E46',
      },
      secondary: {
        main: '#4ECCA3',
      }
    },
    typography:{
      fontFamily: ['Righteous', 'cursive'].join(',')
    },
  });

  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
          <div className="content-wrap">
            <Router>
              <Navbar/>
              <Switch>
                <Route exact path='/'><Home/></Route>
                <Route exact path='/blog'><Projects/></Route>
                <Route exact path='/blog/:slug'><PRView PRSlugs="blogSlugs" PR="blog"/></Route>
                <Route exact path='/reviews/:slug'><PRView PRSlugs="reviewSlugs" PR="reviews"/></Route>
                <Route exact path='/reviews'><Reviews/></Route>
                <Route exact path='/posts'><Posts/></Route>
                <Route exact path='/about'><About/></Route>
                <Route path='*'><NotFound/></Route>
              </Switch>
            </Router>          
          </div>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
