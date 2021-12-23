import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

    const router = useRouter()

    const [title, setTile] = useState('')
    const [runtime, setRunTime] = useState('')
    const [imdb, setImdb] = useState(0)
    const [year, setYear] = useState(0)
    const [director, setDirector] = useState('')
    const [overview, setOverview] = useState('')
    const [image, setImage] = useState('')

    const [movie, setMovie] = useState('')


    const handleCreateRecord = async () => {
        const tempData = {}

        tempData.Poster_Link = image
        tempData.Series_Title = title
        tempData.Runtime = runtime
        tempData.IMDB_Rating = imdb
        tempData.Released_Year = year
        tempData.Director = director
        tempData.Overview = overview
        tempData.uuid = 7999

        const body = {
            key: tempData.uuid,
            value: tempData

        }
        const response = await axios.post("http://localhost:8080/create", body)
        console.log(response)
        if (response.status === 200) {
            alert("Record Created")
            router.push(`/movie/${tempData.uuid}`)
        }
    }

    return (
        <>
            <div className={styles.container} style={{ display: "flex", maxWidth: "800px", margin: "50px auto" }}>
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
                        <button onClick={handleCreateRecord} style={{ marginTop: "20px" }}>Create</button>
                    </div>

                </div>

            </div>
        </>

    )
}
