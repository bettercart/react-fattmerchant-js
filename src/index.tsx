import { FattmerchantConstructor } from '@bettercart/react-fattmerchant-js'
import { loadScript, initFattJs } from './utils/loader'

const fattJsPromise = loadScript()

let loadCalled = false

fattJsPromise.catch((err: Error) => {
  if (!loadCalled) {
    console.warn(err)
  }
})

export const loadFattJs = async (...args: Parameters<FattmerchantConstructor>) => {
  const fattJs = await fattJsPromise
  return initFattJs(fattJs, args)
}

export { Elements, useFattJs } from './components/FattJs'
