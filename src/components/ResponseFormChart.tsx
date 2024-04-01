'use client'

import { useEffect, useState } from 'react'
import LineChart, { Data } from './LineChart'
import { DateRange } from 'react-day-picker'
import DatePickerRange from './DateRangePicker'
import { GetResponsesByDate } from '@/lib/actions/response'
import { subDays } from 'date-fns'
import { toast } from './ui/use-toast'

export default function ResponseFormChart({
  id,
  initialData,
}: {
  id: string
  initialData: Data
}) {
  const [data, setData] = useState<Data>(initialData)
  const [date, setDate] = useState<DateRange>()

  useEffect(() => {
    const getData = async () => {
      try {
        const responses = await GetResponsesByDate(
          id,
          date?.from || subDays(new Date(), 5),
          date?.to || new Date()
        )

        setData([responses])
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        })
      }
    }

    getData()
  }, [date, id])

  return (
    <>
      <LineChart data={data} />
      <DatePickerRange date={date} setDate={setDate} />
    </>
  )
}
