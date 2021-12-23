import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'

export default function Home() {

    const router = useRouter()
    const { id } = router.query

    const [title, setTile] = useState('')
    const [runtime, setRunTime] = useState('')
    const [imdb, setImdb] = useState(0)
    const [year, setYear] = useState(0)
    const [director, setDirector] = useState('')
    const [overview, setOverview] = useState('')
    const [image, setImage] = useState('')

    const [movie, setMovie] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`http://localhost:8080/movie/${id}`)
            setMovie(response.data)
            const data = response.data
            setImage(data.Poster_Link)
            setTile(data.Series_Title)
            setRunTime(data.Runtime)
            setImdb(data.IMDB_Rating)
            setYear(data.Released_Year)
            setDirector(data.Director)
            setOverview(data.Overview)
        }
        fetchData()
    }, [id])

    const handleUpdateRecord = async () => {
        const tempData = movie

        tempData.Poster_Link = image
        tempData.Series_Title = title
        tempData.Runtime = runtime
        tempData.IMDB_Rating = imdb
        tempData.Released_Year = year
        tempData.Director = director
        tempData.Overview = overview

        const body = {
            key: tempData.uuid,
            value: tempData

        }
        const response = await axios.post("http://localhost:8080/update", body)
        console.log(response)
        if (response.status === 200) {
            alert("Record updated")
            router.push(`/movie/${tempData.uuid}`)
        }
        // const response = await axios.post(`http://localhost:8080/delete/${movie.uuid}`)
        // if (response.data === "success") {
        //     alert("Record deleted...")
        //     router.push("/")
        // }
    }

    return (
        <>
            {movie && <div className={styles.container} style={{ display: "flex", maxWidth: "800px", margin: "50px auto" }}>
                <div>
                    <img style={{ width: "200px", margin: "20px" }} src={image} alt='' />
                </div>
                <div style={{ marginLeft: "100px", }}>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Title: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setTile(e.target.value)} value={title} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Runtime:  </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setRunTime(e.target.value)} value={runtime} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>IMDB: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setImdb(e.target.value)} value={imdb} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Year: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setYear(e.target.value)} value={year} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Director: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setDirector(e.target.value)} value={director} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Overview: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setOverview(e.target.value)} value={overview} />
                    </div>
                    <div style={{ margin: "20px" }}>
                        <label style={{ color: "grey" }}>Image Url: </label>
                        <input type="tel" id="phone" name="phone" onChange={(e) => setImage(e.target.value)} value={image} />
                    </div>

                    <div style={{ margin: "20px" }}>
                        <button onClick={handleUpdateRecord} style={{ marginTop: "20px" }}>Update</button>
                    </div>

                </div>

            </div>}
        </>

    )
}
