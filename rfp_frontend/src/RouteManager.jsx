
import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Vendors from './pages/Vendors'
import Rfp from './pages/Rfp'
import GeneratedRfp from './pages/GeneratedRfp'
import History from './pages/History'
import HistoryAll from './pages/HistoryAll'
import Reply from './pages/Reply'

const RouteManager = () => {
  return (
    <Routes>
        <Route path='/vendors'  element={<Vendors/>} />
        <Route path='/rfp' element={<Rfp/>} />
        <Route path='/generatedrfp/:prompt' element={<GeneratedRfp/>} />
        <Route path='/history/:id' element={<History/>} />
        <Route path='/history' element={<HistoryAll/>} />
        <Route path='/reply/:messageId' element={<Reply/>} />
    </Routes>
  )
}

export default RouteManager