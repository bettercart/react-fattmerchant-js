import React, { useEffect } from 'react'
import { useFattJs } from '@bettercart/react-fattmerchant-js'

export default () => {
  const fattJs = useFattJs()

  useEffect(() => {
    if (fattJs)
      fattJs.showCardForm().then(handler => {
        handler.setTestPan('4111111111111111')
        handler.setTestCvv('123')
      })
  })

  const getToken = () => {
    if (!fattJs) return

    fattJs
      .tokenize({
        first_name: 'Dan',
        last_name: 'W',
        address_1: '123 Main St',
        address_city: 'Chicago',
        address_state: 'IL',
        address_country: 'US',
        month: '01',
        year: '2022',
      })
      .then(result => {
        console.log(result)
        alert(`Payment Method Id: ${result.id}`)
      })
  }

  return (
    <>
      <div id="card-number" style={{ width: '200px', height: '300px' }}></div>
      <div id="card-cvv" style={{ width: '50px', height: '300px' }}></div>

      <button onClick={getToken} id="paybutton">
        Pay
      </button>
    </>
  )
}
