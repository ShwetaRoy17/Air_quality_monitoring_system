import React, { useState, useEffect } from "react";
import AQIDial from "../components/dial";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import io from 'socket.io-client'

const socket = io("http://localhost:8000/api/v1/airquality");

const HomePage = () => {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    aqi: 240,
    gasvalue: 400,
  });
  const [theme, setTheme] = useState("morning");
  // const [boxColor, setBoxColor] = useState('safe');
  const [fact, setFact] = useState("");

  // Mock fetch data function
  const fetchData = () => {
    // Replace this with an API call
    setData({ temperature: 25, pressure: 1013, aqi: 120, co2: 410 });
  };

  // Determine theme based on time
  const determineTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTheme("morning");
    else if (hour >= 12 && hour < 17) setTheme("afternoon");
    else if (hour >= 17 && hour < 20) setTheme("evening");
    else setTheme("night");
    console.log(theme);
  };

  // Determine box color and AQI facts
  const determineBoxColorAndFacts = () => {
    const { aqi } = data;
    if (aqi <= 50) {
      // setBoxColor('safe');
      setFact("Good air quality with minimal impact.");
    } else if (aqi <= 100) {
      // setBoxColor('moderate');
      setFact("Moderate air quality, acceptable for most individuals.");
    } else if (aqi <= 200) {
      // setBoxColor('unhealthy');
      setFact("Unhealthy for sensitive groups, consider reducing exposure.");
    } else if (aqi <= 300) {
      // setBoxColor('unhealthy');
      setFact("Unhealthy for sensitive groups, consider reducing exposure.");
    } else if (aqi <= 400) {
      // setBoxColor('unhealthy');
      setFact("Unhealthy for sensitive groups, consider reducing exposure.");
    } else if (aqi <= 500) {
      // setBoxColor('unhealthy');
      setFact("Unhealthy for sensitive groups, consider reducing exposure.");
    } else if (aqi <= 600) {
      // setBoxColor('unhealthy');
      setFact("Unhealthy for sensitive groups, consider reducing exposure.");
    } else {
      // setBoxColor('hazardous');
      setFact("Hazardous air quality, avoid outdoor activities.");
    }
  };

  // Effects
  useEffect(() => {
    socket.on('sensorData',(data)=>{
      setData(data)
      console.log(data);
    })
    determineTheme();
    return ()=> socket.off('sensorData');
  },[]);

  useEffect(() => {
    determineBoxColorAndFacts();
  }, [data]);

  return (
    <div className={`bg-${theme} bg-cover h-screen `}>
      <h1 className="text-2xl font-bold text-center pt-6">
        Environmental Dashboard
      </h1>
      <div
        className={`h-auto mt-4 md:h-[80%] flex flex-col md:flex-row md:w-[70%] md:ml-auto md:mr-auto items-center justify-center shadow-2xl backdrop-blur-md`}
      >
        <div className="text-center  h-4/7 md:h-[60%] md:mt-auto md:mb-auto p-2 md:p-6 mb-6 md:mr-6 md:rounded-lg md:shadow-xl md:w-[40%] ">
          <div className="text-center md:text-justify">
            <p className="text-lg">Temperature: {data.temperature}°C</p>
            <p className="text-lg">Humidity: {data.humidity} </p>
            <p className="text-lg">AQI: {data.aqi}</p>
            <p className="text-lg">gasValue: {data.gasvalue} ppm</p>
          </div>
          <div className=" md:visible text-center md:text-justify">
            <h6 className="text-sm  font-semibold">AQI Severity:</h6>
            <p className="text-sm">{fact}</p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className={` w-96 md:h-[60%] md:w-[40%] md:mt-auto md:mb-auto p-6 rounded-lg shadow-2xl h-3/7 text-white lg:w-[30%]`}
        >
          <AQIDial aqi={data.aqi} />
          <div className="visible md:hidden text-center">
            <p className="text-sm font-semibold">AQI Severity:</p>
            <p className="text-sm">{fact}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
