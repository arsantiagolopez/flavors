import { ResponsiveLine } from "@nivo/line";
import React from "react";

const GradientTestGraph = ({ data }) => {
  const negativeGradient = [
    {
      offset: 0,
      color: "rgba(0,0,10,0.2)",
    },
    {
      offset: 50,
      color: "rgb(245,58,45)",
    },
  ];

  return (
    <ResponsiveLine
      // Gradient props
      enableArea={true}
      defs={[
        {
          id: "negative",
          type: "linearGradient",
          colors: negativeGradient,
        },
      ]}
      fill={[{ match: "*", id: "negative" }]}
      // Base
      data={[data]}
      margin={{
        top: 27,
        right: 0,
        bottom: 27,
        left: 0,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      colors={"rgb(245,58,45)"}
      curve="catmullRom"
      lineWidth={2}
      // Points
      enablePoints={false}
      // Grid & axes
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisBottom={null}
      axisRight={null}
      axisLeft={null}
      // Interactivity
      useMesh={false}
      enableSlices={false}
      enableCrosshair={false}
      crosshairType="top"
      // tooltip={(point) => <Tooltip point={point} />}
      // Motion
      animate={true}
      motionConfig="slow"
    />
  );
};

const PositiveTestGraph = ({ data, isPositive }) => {
  const positiveGradient = [
    {
      offset: 50,
      color: "rgba(76,216,100,255)",
    },
    {
      offset: 100,
      color: "rgba(0,0,10,0.2)",
    },
  ];
  const negativeGradient = [
    {
      offset: 99,
      color: "rgb(245,58,45)",
    },
    {
      offset: 98,
      color: "rgba(0,0,10,0.1)",
    },
  ];

  return (
    <ResponsiveLine
      // Gradient props
      enableArea={true}
      defs={[
        {
          id: "gradient",
          type: "linearGradient",
          colors: isPositive ? positiveGradient : negativeGradient,
        },
      ]}
      fill={[{ match: "*", id: "gradient" }]}
      // Base
      data={[data]}
      margin={{
        top: !isPositive ? 27 : 5,
        right: 0,
        bottom: !isPositive ? 27 : 5,
        left: 0,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      colors={isPositive ? "rgba(76,216,100,255)" : "rgb(245,58,45)"}
      curve="catmullRom"
      lineWidth={2}
      // Points
      enablePoints={false}
      // Grid & axes
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisBottom={null}
      axisRight={null}
      axisLeft={null}
      // Interactivity
      useMesh={false}
      enableSlices={false}
      enableCrosshair={false}
      crosshairType="top"
      // tooltip={(point) => <Tooltip point={point} />}
      // Motion
      animate={true}
      motionConfig="slow"
    />
  );
};

export { GradientTestGraph, PositiveTestGraph };
