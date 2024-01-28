import React from "react";
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CustomAreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={500} height={900} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3784F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <XAxis dataKey="name" interval="preserveStartEnd" axisLine={false} tickLine={false} />
        <YAxis dataKey="avgPrice" interval="preserveStartEnd" axisLine={false} tickLine={false} orientation="right" />
        <YAxis yAxisId={2} height={10} hide={true} dataKey="volume" />
        <Tooltip />
        <Area type="monotone" dataKey="avgPrice" stroke="#3784F6" fill="url(#colorUv)" />
        <Bar yAxisId={2} dataKey="volume" barSize={5} fill="rgba(55,132,246,0.4)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CustomAreaChart
