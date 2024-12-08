import React from "react";
import { motion } from "framer-motion";


const DGauge = ({ ranges }) => {
   

  return (
    <div className="relative w-80 h-40">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        {/* Draw each section */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startAngle = 180 + (i * 180) / 8; // Start angle for each section
          const endAngle = startAngle + 180 / 8; // End angle for each section

          const startX = 50 + 45 * Math.cos((Math.PI * startAngle) / 180);
          const startY = 45 + 45 * Math.sin((Math.PI * startAngle) / 180);

          const endX = 50 + 45 * Math.cos((Math.PI * endAngle) / 180);
          const endY = 45 + 45 * Math.sin((Math.PI * endAngle) / 180);

          const largeArcFlag = 0; // For smaller arcs

          const pathData = `M50,45 L${startX},${startY} A45,45 0 ${largeArcFlag},1 ${endX},${endY} Z`;

        //   {console.log(colors[2])}
          return (
            <path
              key={i}
              d={pathData}
              fill="{colors[i]}"
            //   {`${colors[i % 8]}`}
            // <textPath href="#lineAC" startOffset="80">I love SVG! I love SVG!</textPath>
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Add range labels */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = 180 + (i + 0.5) * (180 / 8); // Midpoint angle for the section
          const labelX = 50 + 50 * Math.cos((Math.PI * angle) / 180);
          const labelY = 45 + 50 * Math.sin((Math.PI * angle) / 180);

          return (
            <text
              key={i}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              fontSize="3"
              fill="black"
            >
              hellow
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// export default DGauge;

// eslint-disable-next-line react/prop-types
const AQIDial = ({ aqi }) => {
const ranges = ["0-50", "51-100", "101-150", "151-200", "201-250", "251-300", "301-350", "351-400"];
const colors = [
    "bg-green-500",
    "bg-lime-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-red-500",
    "bg-purple-600",
    "bg-purple-800",
    "bg-black",
  ];
  // Determine AQI level and corresponding color
  const getAQILevel = () => {
    if (aqi <= 50) return { type: "Good", color: colors[0] };
    if (aqi <= 100) return { type: "Moderate", color: colors[1] };
    if (aqi <= 200) return { type: "Unhealthy", color: colors[2] };
    if (aqi <= 300) return { type: "Very Unhealthy", color: colors[3]};
    if (aqi <= 400) return { type: "Very Unhealthy", color: colors[4]};
    if (aqi <= 500) return { type: "Very Unhealthy", color: colors[5]};
    if (aqi <= 600) return { type: "Very Unhealthy", color: colors[6]};
    return { type: "Hazardous", color: colors[7] };
  };

  const { type, color } = getAQILevel();

  // Calculate the hand rotation based on AQI value (0 to 400 mapped to -90° to 90°)
  const rotation = (aqi / 800) * 180 - 90;

  return (
    <div className="relative w-80 h-40">
      {/* Background D-scale */}
      <div className="absolute top-0 left-0 w-full h-full">
       
        <DGauge ranges={ranges}/>
       

      {/* Gauge Hand */}
      <motion.div
        initial={{ rotate: 180 }}
        animate={{ rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          
        }}
        className="absolute left-[50%] top-[45%] origin-bottom w-1 h-20 bg-green-500"
      />

      {/* Center Label */}
      <div
        className={`absolute left-[50%] bottom-0  translate-x-[-50%] translate-y-[50%] w-8 h-8 rounded-full text-center flex flex-col items-center justify-center text-white ${color}`}
      >
        <span className="text-xs font-semibold">{type}</span>
        <span className="text-lg font-bold">{aqi}</span>
      </div>
      </div>

      {/* AQI Levels */}
      
    </div>
  );
};

export default AQIDial;
