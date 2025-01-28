'use client'
import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FetchDataPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Replace this with your API URL
    const fetchData = async () => {
      const response = await fetch('https://40ikiwic12.execute-api.ap-southeast-2.amazonaws.com/questions/get')
      const result = await response.json()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div className="p-4" collapsible="true">
      <Accordion type="multiple">
        {data.map((item, index) => (
          <AccordionItem value={index}>
            <AccordionTrigger>{item.answer}</AccordionTrigger> {/* This is the title of the accordion */}
            <AccordionContent>
      {item.hint1 && <p>{item.hint1}</p>}
        {item.hint2 && <p>{item.hint2}</p>}
        {item.hint3 && <p>{item.hint3}</p>}
        
    </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    

    </div>
  )
}

export default FetchDataPage
