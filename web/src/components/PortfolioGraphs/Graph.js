import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { Tooltip } from "./Tooltip";

const Graph = ({ data }) => (
  <ResponsiveLine
    // Base
    data={[data]}
    margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    colors="rgba(255,255,255,1)"
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
    useMesh={true}
    enableSlices={false}
    enableCrosshair={false}
    crosshairType="top"
    tooltip={(point) => <Tooltip point={point} />}
    // Motion
    animate={true}
    motionConfig="slow"
  />
);

export { Graph };
