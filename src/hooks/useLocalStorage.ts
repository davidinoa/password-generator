import { useState, useEffect } from 'react'

export default function useLocalStorage<TState>(
  key: string,
  initialValue: TState
) {
  const invalidKey = typeof key !== 'string' || key.length < 1

  if (invalidKey) throw TypeError('Storage key must be a non-empty string.')

  const [state, setState] = useState<TState>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(key) ?? '') || initialValue
    } catch (err) {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState] as const
}
