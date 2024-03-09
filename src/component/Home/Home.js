import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const [listingData, setListingData] = useState([]);
  const [totalimage, setTotalimage] = useState("");
  const [Analyzedtotal, setTotalAnalyzed] = useState("");
  const [SpeedCount, setHighSpeedCount] = useState("");
  const [LowSpeed, setLowSpeed] = useState("");
  const [data, setData] = useState("");

  const fetchImageData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/analysis-results/"
      );

      const mergedData = response.data.results.map((item) => {
        return {
          name: `Image ${item.id}`,
          speed: item.speed,
          height: item.speed_flag ? item.height : null,
          width: item.speed_flag ? item.width : null,
        };
      });

      setListingData(response.data.results);
      setTotalimage(response?.data?.count);

      let analyzedCount = 0;
      let highSpeedCount = 0;
      let lowSpeedCount = 0;

      response.data.results.forEach((item) => {
        if (item.analyzed) {
          analyzedCount++;
        }
        if (item.speed > 60) {
          highSpeedCount++;
        } else if (item.speed < 60) {
          lowSpeedCount++;
        }
      });
      setLowSpeed(lowSpeedCount);
      setHighSpeedCount(highSpeedCount);
      setTotalAnalyzed(analyzedCount);
      setData([...data, ...mergedData]);
    } catch (error) {
      console.log("Error fetching image data:", error);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL IMAGE</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{totalimage}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL IMAGE ANALYZED</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{Analyzedtotal}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SPEED GREATER THEN 60</h3>
            <FontAwesomeIcon
              icon={faImage}
              style={{ fontSize: "24px", color: "black" }}
            />
          </div>
          <h1>{SpeedCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SPEED GREATER LESS THEN 60</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{LowSpeed}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="height" fill="#8884d8" name="Height" />
            <Bar dataKey="speed" fill="#82ca9d" name="Speed" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="height"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
