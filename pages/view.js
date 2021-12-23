import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

    const [movieData, setMovieData] = useState([])

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/movies')
            setMovieData(response.data)
        }
        fetchData()
        console.log(movieData)
    }, [movieData])

    return (
        <>
            <button onClick={() => router.push("/create/")}>Create</button>
            <button onClick={() => router.push("/graph/")}>Graph</button>
            <div className={styles.container} style={{ display: "flex", flexWrap: "wrap" }}>
                {movieData?.map(movie => {
                    if (movie?.Poster_Link) {
                        return (
                            <div onClick={() => router.push(`/movie/${movie.uuid}`)} key={movie.Poster_Link} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", maxWidth: "300px", height: "400px" }}>
                                <img style={{ width: "200px", margin: "20px" }} src={movie.Poster_Link} alt='' />
                                <p style={{ maxWidth: "200px", textAlign: "center" }}>{movie.Series_Title}</p>

                                <h5> IMDB: {movie.IMDB_Rating}</h5>
                                <h5 style={{ color: "red" }}>{movie.Released_Year} </h5>

                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}


