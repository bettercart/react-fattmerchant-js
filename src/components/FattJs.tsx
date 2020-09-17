import * as React from 'react'
import { isFattJs, isPromise } from '../utils/guards'
import { usePrevious } from '../utils/usePrevious'
import * as fattJs from '@bettercart/react-fattmerchant-js'

const INVALID_STRIPE_ERROR =
  'Invalid prop `fattJs` supplied to `Elements`. We recommend using the `loadFattJs` utility from `@bettercart/react-fattmerchant-js`.'

const validateFattJs = (maybeFattmerchant: unknown): null | fattJs.Fattmerchant => {
  if (maybeFattmerchant === null || isFattJs(maybeFattmerchant)) {
    return maybeFattmerchant
  }

  throw new Error(INVALID_STRIPE_ERROR)
}

type ParsedFattJsProp =
  | { tag: 'empty' }
  | { tag: 'sync'; fattJs: fattJs.Fattmerchant }
  | { tag: 'async'; fattJsPromise: Promise<fattJs.Fattmerchant | null> }

const parseFattJsProp = (raw: unknown): ParsedFattJsProp => {
  if (isPromise(raw)) {
    return {
      tag: 'async',
      fattJsPromise: Promise.resolve(raw).then(validateFattJs),
    }
  }

  const fattJs = validateFattJs(raw)

  if (fattJs === null) {
    return { tag: 'empty' }
  }

  return { tag: 'sync', fattJs }
}

interface ElementsProps {
  fattJs: PromiseLike<fattJs.Fattmerchant | null> | fattJs.Fattmerchant | null
}

interface PrivateElementsProps {
  fattJs: unknown
  children?: React.ReactNode
}

interface ElementsContextValue {
  fattJs: fattJs.Fattmerchant | null
}

const ElementsContext = React.createContext<ElementsContextValue | null>(null)

export const Elements: React.FunctionComponent<ElementsProps> = ({
  fattJs: rawFattJsProp,
  children,
}: PrivateElementsProps) => {
  const final = React.useRef(false)
  const isMounted = React.useRef(true)
  const parsed = React.useMemo(() => parseFattJsProp(rawFattJsProp), [rawFattJsProp])
  const [ctx, setContext] = React.useState<ElementsContextValue>(() => ({
    fattJs: null,
  }))

  const prevFattJs = usePrevious(rawFattJsProp)
  if (prevFattJs !== null) {
    if (prevFattJs !== rawFattJsProp) {
      console.warn('Unsupported prop change on Elements: You cannot change the `fattJs` prop after setting it.')
    }
  }

  if (!final.current) {
    if (parsed.tag === 'sync') {
      final.current = true
      setContext({
        fattJs: parsed.fattJs,
      })
    }

    if (parsed.tag === 'async') {
      final.current = true
      parsed.fattJsPromise.then(fattJs => {
        if (fattJs && isMounted.current) {
          setContext({
            fattJs,
          })
        }
      })
    }
  }

  React.useEffect(() => {
    return (): void => {
      isMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    const anyFattJs: any = ctx.fattJs

    if (!anyFattJs) {
      return
    }
  }, [ctx.fattJs])

  return <ElementsContext.Provider value={ctx}>{children}</ElementsContext.Provider>
}

export const useFattJs = (): fattJs.Fattmerchant | null => {
  const ctx = React.useContext(ElementsContext)

  if (!ctx) {
    throw new Error(
      `Could not find Elements context; You need to wrap the part of your app that in an <Elements> provider.`
    )
  }

  return ctx?.fattJs
}
