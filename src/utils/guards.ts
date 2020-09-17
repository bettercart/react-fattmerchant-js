import { Fattmerchant } from '@bettercart/react-fattmerchant-js'

export const isUnknownObject = (raw: unknown): raw is { [key in PropertyKey]: unknown } => {
  return raw !== null && typeof raw === 'object'
}

export const isPromise = (raw: unknown): raw is PromiseLike<unknown> => {
  return isUnknownObject(raw) && typeof raw.then === 'function'
}

export const isFattJs = (raw: unknown): raw is Fattmerchant => {
  return (
    isUnknownObject(raw) &&
    typeof raw.showCardForm === 'function' &&
    typeof raw.tokenize === 'function' &&
    typeof raw.pay === 'function' &&
    typeof raw.on === 'function'
  )
}
