const FATTJS_URL = 'https://fattjs.fattpay.com/js/fattmerchant.js'
const FATTJS_URL_REGEX = /^https:\/\/fattjs\.fattpay\.com\/js\/fattmerchant\.js\/?(\?.*)?$/

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

let stripePromise: Promise<StripeConstructor | null> | null = null;

export const loadScript = (): Promise<StripeConstructor | null> => {
  // Ensure that we only attempt to load fattmerchant.js at most once
  if (stripePromise !== null) {
    return stripePromise
  }

  stripePromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null)
      return
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE)
    }

    if (window.Stripe) {
      resolve(window.Stripe)
      return
    }

    try {
      let script = findScript()

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE)
      } else if (!script) {
        script = injectScript(params)
      }

      script.addEventListener('load', () => {
        if (window.Stripe) {
          resolve(window.Stripe)
        } else {
          reject(new Error('Stripe.js not available'))
        }
      })

      script.addEventListener('error', () => {
        reject(new Error('Failed to load Stripe.js'))
      })
    } catch (error) {
      reject(error)
      return
    }
  })

  return stripePromise
}
