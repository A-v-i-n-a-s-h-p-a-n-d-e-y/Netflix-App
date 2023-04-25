
import React, { useEffect,useState } from "react";
import "./home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"



const apiKey="212ab98f341749873718e03cc2f206a7";
const url="https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming="upcoming";
const nowPlaying="toprated";
const popular="popular";



const Card=({img})=><img className="card" src={img} alt="cover"/>

const Row = ({title,arr=[]})=>(
    <div className='row'>
        <h2>{title}</h2>

        <div>
            {
                arr.map((item,index)=>(
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
                ))
            }
           
        </div>
   </div>
)
const Home = () => {

    const [upcomingMovies,setUpcomingMovies]= useState([]);
    const [topratedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
  

    useEffect(()=>{
         const fetchUpcoming=async()=>{
          const{
            data:{results},
        }=  await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
          setUpcomingMovies(results);

         };
         const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
            setTopRatedMovies(results);
        };
         const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
            setPopularMovies(results);
        };
         fetchUpcoming();
         fetchTopRated();
        fetchPopular();
  
    },[])

    return (
        <section className='home'>
             <div className="banner" style={{
                    backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}>
                    {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>

                </div>

            <Row title={"Upcoming "} arr={upcomingMovies}/>
            <Row title={"TopRated"} arr={topratedMovies}/>
            <Row title={"Popular"} arr={popularMovies}/>
           

        </section>
    )
}
export default Home

