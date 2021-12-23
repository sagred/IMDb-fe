import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from "axios";

export default function CardBarChart() {

    const [movieData, setMovieData] = useState([])

    const [labels, setLabels] = useState([])
    const [graphData, setGraphData] = useState([])
    const [render, setRender] = useState(false)
    console.log(graphData)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/movies')
            setMovieData(response.data)
            const tempLabels = []
            const tempData = []
            response.data?.map(movie => {
                if (tempLabels.length < 50) {
                    const str = movie?.Gross
                    const num = parseFloat(str?.replace(/,/g, ''));
                    tempData.push(str)
                    tempLabels.push(`${movie?.Series_Title}, ${movie?.Released_Year}`)

                }
            })
            await setLabels(tempLabels)
            await setGraphData(tempData)
            await setRender(true)
        }
        fetchData()
        console.log(movieData)
    }, [movieData])

    React.useEffect(() => {
        if (render) {


            let config = {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Gross: ",
                            backgroundColor: "#3182ce",
                            borderColor: "#3182ce",
                            data: graphData,
                        },
                    ],
                },
                // options: {

                //     responsive: true,
                //     title: {
                //         display: false,
                //         text: "Orders Chart",
                //     },
                //     tooltips: {
                //         mode: "index",
                //         intersect: false,
                //     },
                //     hover: {
                //         mode: "nearest",
                //         intersect: true,
                //     },
                //     legend: {
                //         labels: {
                //             fontColor: "rgba(0,0,0,.4)",
                //         },
                //         align: "end",
                //         position: "bottom",
                //     },
                //     scales: {
                //         xAxes: [
                //             {
                //                 display: false,
                //                 scaleLabel: {
                //                     display: true,
                //                     labelString: "Month",
                //                 },
                //                 gridLines: {
                //                     borderDash: [2],
                //                     borderDashOffset: [2],
                //                     color: "rgba(33, 37, 41, 0.3)",
                //                     zeroLineColor: "rgba(33, 37, 41, 0.3)",
                //                     zeroLineBorderDash: [2],
                //                     zeroLineBorderDashOffset: [2],
                //                 },
                //             },
                //         ],
                //         yAxes: [
                //             {
                //                 display: true,
                //                 scaleLabel: {
                //                     display: false,
                //                     labelString: "Value",
                //                 },
                //                 gridLines: {
                //                     borderDash: [2],
                //                     drawBorder: false,
                //                     borderDashOffset: [2],
                //                     color: "rgba(33, 37, 41, 0.2)",
                //                     zeroLineColor: "rgba(33, 37, 41, 0.15)",
                //                     zeroLineBorderDash: [2],
                //                     zeroLineBorderDashOffset: [2],
                //                 },
                //             },
                //         ],
                //     },
                // },
            };
            let ctx = document.getElementById("bar-chart").getContext("2d");
            window.myBar = new Chart(ctx, config);
        }
    }, [render]);

    if (render) {
        return (
            <>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded" style={{ backgroundColor: "wheat" }}>
                    <div className="p-4 flex-auto">
                        {/* Chart */}
                        <div className="relative h-350-px">
                            <canvas id="bar-chart"></canvas>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div></div>
        )
    }

}