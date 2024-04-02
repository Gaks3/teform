'use client'

import { useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { toast } from './ui/use-toast'
import DatePickerRange from './DateRangePicker'
import { GetMostFormByUserAndDate } from '@/lib/actions/form'
import { subDays } from 'date-fns'
import BarChart, { Data } from './BarChart'

export default function MostFormByDateChart({
  initialData,
}: {
  initialData: Data
}) {
  const [data, setData] = useState(initialData)
  const [date, setDate] = useState<DateRange>()

  const getData = useCallback(async () => {
    try {
      const forms = await GetMostFormByUserAndDate(
        date?.from || subDays(new Date(), 5),
        date?.to || new Date()
      )

      setData(forms)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }, [date])

  useEffect(() => {
    if (date) getData()
  }, [date, getData])

  return (
    <>
      <BarChart data={data} />
      <DatePickerRange date={date} setDate={setDate} />
    </>
  )
}
