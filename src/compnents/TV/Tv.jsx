
import React, { useEffect,useState } from "react";
import "./tv.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"



const apiKey="212ab98f341749873718e03cc2f206a7";
const url="https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original";
// const upcoming="upcoming";
// const nowPlaying="toprated";
// const popular="popular";



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

    const [airingtodayMovies,setAiringtodayMovies]= useState([]);
    const [topratedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [ontheairMovies, setOntheairMovies] = useState([]);
  

    useEffect(()=>{
         const fetchAiringtoday=async()=>{
          const{
            data:{results},
        }=  await axios.get("https://api.themoviedb.org/3/tv/airing_today?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
         setAiringtodayMovies(results);

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
            } = await axios.get("https://api.themoviedb.org/3/tv/popular?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
            setPopularMovies(results);
        };
        const fetchOntheair = async () => {
            const {
                data: { results },
            } = await axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=212ab98f341749873718e03cc2f206a7&language=en-US&page=1");
            setOntheairMovies(results);
        };
         fetchAiringtoday();
         fetchTopRated();
         fetchPopular();
         fetchOntheair();
  
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

            <Row title={"Airingtoday"} arr={airingtodayMovies}/>
            <Row title={"TopRated"} arr={topratedMovies}/>
            <Row title={"Popular"} arr={popularMovies}/>
            <Row title={"Ontheair"}arr={ontheairMovies}/>
           

        </section>
    )
}
export default Home
