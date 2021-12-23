import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'

export default function Home() {

    const router = useRouter()
    const { id } = router.query

    const [movie, setMovie] = useState('')
    console.log(movie)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`http://localhost:8080/movie/${id}`)
            setMovie(response.data)
        }
        fetchData()
    }, [id])

    const handleDeleteRecord = async () => {
        const response = await axios.post(`http://localhost:8080/delete/${movie.uuid}`)
        if (response.data === "success") {
            alert("Record deleted...")
            router.push("/")
        }
    }

    const handleEditRecord = async () => {
        router.push(`/edit/${movie.uuid}`)
    }

    return (
        <>
            {movie && <div className={styles.container} style={{ display: "flex", maxWidth: "800px", margin: "50px auto" }}>
                <div>
                    <img style={{ width: "200px", margin: "20px" }} src={movie.Poster_Link} alt='' />
                </div>
                <div style={{ marginLeft: "100px" }}>
                    <h2 style={{ color: "white" }}>{movie.Series_Title}</h2>
                    <h4 style={{ color: "white", margin: "0" }}>{movie.Runtime}</h4>
                    <h5> IMDB: {movie.IMDB_Rating}</h5>
                    <h5 style={{ color: "red" }}>{movie.Released_Year} </h5>
                    <h5 style={{ color: "white" }}>Director:</h5>
                    <h5 style={{ color: "grey", }}><span >{movie.Director}</span></h5>
                    <h5 style={{ color: "grey", marginTop: "20px", }}><span style={{ color: "white" }}>Actors:</span></h5>
                    <h5 style={{ color: "grey", }}><span > {movie?.Star1},{movie?.Star2},{movie?.Star3},{movie?.Star4}</span></h5>
                    <h5 style={{ color: "grey", fontFamily: "sans-serif", fontSize: "14px", marginTop: "20px", fontWeight: "lighter" }}>{movie.Overview}</h5>

                    <button onClick={handleEditRecord} style={{ marginTop: "20px" }}>Edit</button>

                    <button onClick={handleDeleteRecord} style={{ marginTop: "20px", marginLeft: "10px" }}>Delete</button>
                </div>

            </div>}
        </>

    )
}
