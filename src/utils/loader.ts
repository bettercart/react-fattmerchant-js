import { FattmerchantConstructor, Fattmerchant } from '@bettercart/react-fattmerchant-js'

declare global {
  interface Window {
    FattJs: any
  }
}

const FATTJS_URL = 'https://fattjs.fattpay.com/js/fattmerchant.js'
const FATTJS_URL_REGEX = /^https:\/\/fattjs\.fattpay\.com\/js\/fattmerchant\.js\/?(\?.*)?$/
const EXISTING_SCRIPT_MESSAGE =
  'FattJs was called but an existing FattJs.js script already exists in the document; existing script parameters will be used'

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script[src^="${FATTJS_URL}"]`)

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]

    if (!FATTJS_URL_REGEX.test(script.src)) {
      continue
    }

    return script
  }

  return null
}

const injectScript = (): HTMLScriptElement => {
  const script = document.createElement('script')
  script.src = `${FATTJS_URL}`

  const headOrBody = document.head || document.body

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. fattmerchant.js requires a <body> element.')
  }

  headOrBody.appendChild(script)

  return script
}

let fattPromise: Promise<FattmerchantConstructor | null> | null = null

export const loadScript = (): Promise<FattmerchantConstructor | null> => {
  // Ensure that we only attempt to load fattmerchant.js at most once
  if (fattPromise !== null) {
    return fattPromise
  }

  fattPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null)
      return
    }

    if (window.FattJs) {
      console.warn(EXISTING_SCRIPT_MESSAGE)
    }

    if (window.FattJs) {
      resolve(window.FattJs)
      return
    }

    try {
      let script = findScript()

      if (script) {
        console.warn(EXISTING_SCRIPT_MESSAGE)
      } else if (!script) {
        script = injectScript()
      }

      script.addEventListener('load', () => {
        if (window.FattJs) {
          resolve(window.FattJs)
        } else {
          reject(new Error('fattmerchant.js not available'))
        }
      })

      script.addEventListener('error', () => {
        reject(new Error('Failed to load fattmerchant.js'))
      })
    } catch (error) {
      reject(error)
      return
    }
  })

  return fattPromise
}

export const initFattJs = (
  maybeFattmerchant: any | null,
  args: Parameters<FattmerchantConstructor>
): Fattmerchant | null => {
  if (maybeFattmerchant === null) {
    return null
  }

  return new maybeFattmerchant(...args)
}
