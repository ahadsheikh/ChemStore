import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {currentTab} from '../../redux/Shipment'
import Chemical from './Chemical'
import Instrument from './Instrument'
import GlassWare from './GlassWare'

const Main = () => {
    const dispatch = useDispatch();
  const {chemical, instrument, glassWare}  = useSelector(state => state.shipment)

  return (
    <div className='container m-5'>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p onClick={() => dispatch(currentTab('chemical'))}>Chemical</p>
            <p onClick={() => dispatch(currentTab('instrument'))}>Glassware</p>
            <p onClick={() => dispatch(currentTab('glassWare'))}>instrument</p>
        </div>
        <div>
            {chemical && <Chemical />}
            {instrument && <Instrument />}
            {glassWare && <GlassWare />}
        </div>
    </div>
  )
}

export default Main