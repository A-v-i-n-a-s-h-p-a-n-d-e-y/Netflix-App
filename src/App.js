
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./compnents/Home/Home"
import Movie from "./compnents/Movie/Movie"
import Navbar from "./compnents/Navbar/Navbar";
import TV  from "./compnents/TV/Tv"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/tvshows" element = {<TV/>}/>
        <Route path = "/movies" element = {<Movie/>}/>
      </Routes>
    </Router>
    
  );
}
export default App;
