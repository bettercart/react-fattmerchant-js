import React from 'react'
import { loadFattJs, Elements } from '@bettercart/react-fattmerchant-js'
import Examples from './Examples'

const fattJs = loadFattJs('Better-Cart-f42b9821d6ce', {
  number: {
    id: 'card-number', // the html id of the div you want to contain the credit card number field
    placeholder: '0000 0000 0000 0000', // the placeholder the field should contain
    style: 'height: 30px; width: 100%; font-size: 15px;', // the style to apply to the field
    type: 'text', // the input type (optional)
    format: 'prettyFormat', // the formatting of the CC number (prettyFormat || plainFormat || maskedFormat)
  },
  cvv: {
    id: 'card-cvv', // the html id of the div you want to contain the cvv field
    placeholder: 'CVV', // the placeholder the field should contain
    style: 'height: 30px; width: 100%; font-size: 15px;', // the style to apply to the field
    type: 'text', // the input type (optional)
  },
})

export default ({ children }) => {
  return (
    <Elements fattJs={fattJs}>
      <Examples />
    </Elements>
  )
}
