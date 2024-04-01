'use client'

import { ResponsiveLine } from '@nivo/line'
import useWindow from 'use-window-width-breakpoints'

export type Data = Array<{
  id: string | number
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
}>

export default function LineChart({ data }: { data: Data }) {
  const breakout = useWindow({
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  })

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 30, bottom: 70, left: 30 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat='>-.2f'
      enableArea
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: breakout.up.sm
          ? data[0].data.length >= 15
            ? data[0].data.length + 10
            : 0
          : 40,
        legend: 'date',
        legendOffset: 65,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      colors={{ scheme: 'category10' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  )
}
