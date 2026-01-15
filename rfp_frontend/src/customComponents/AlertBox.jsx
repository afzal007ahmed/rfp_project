import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import React from 'react'

const AlertBox = ({ message , success , title }) => {
  return (
    <Alert className="my-7">
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription className={`${success ? "text-green-600" : "text-red-600"} font-bold`}>
        { message }
      </AlertDescription>
    </Alert>
  )
}

export default AlertBox