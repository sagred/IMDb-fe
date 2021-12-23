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
    <div className={styles.container} style={{ display: "flex", flexWrap: "wrap" }}>
      {movieData.map(movie => {
        console.log(movie)
        if (movie?.Poster_Link) {
          return (
            <div onClick={() => router.push(`/movie/${movie.uuid}`)} key={movie.Poster_Link} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <img style={{ width: "50px" }} src={movie.Poster_Link} alt='' />
            </div>
          )
        }
      })}
    </div>
  )
}
