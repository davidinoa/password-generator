'use client'

import { initParams, localStorageKeys, modes } from '@/config'
import { InputEvents, Mode, TParams } from '@/types'
import Params from '@/components/Params'
import ChoiceToggle from '@/components/ChoiceToggle'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Home() {
  const [mode, setMode] = useLocalStorage<Mode>(localStorageKeys.mode, modes.PW)
  const [params, setParams] = useLocalStorage<TParams>(
    localStorageKeys.params,
    initParams
  )

  const handleInputChange = (e: InputEvents) => {
    let { name, value, type, checked } = e.currentTarget
    let newValue: string | number | boolean = value

    if (type === 'range' || type === 'number') newValue = parseInt(value)
    if (type === 'checkbox') newValue = checked
    if (type === 'checkbox' && mode === modes.PW) {
      const options: (keyof TParams['password'])[] = [
        'lower',
        'upper',
        'numbers',
        'symbols',
      ]
      const numChecked = options.reduce(
        (num, flag) => (params[mode][flag] ? num + 1 : num),
        0
      )
      // user should select at least one option
      if (!value && numChecked === 1) return
    }
    setParams((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [name]: newValue,
      },
    }))
  }

  return (
    <main>
      <ChoiceToggle
        choices={{ Password: modes.PW, Passphrase: modes.PP }}
        onToggle={(mode) => setMode(mode)}
        initial={mode}
      />
      <Params mode={mode} values={params} onChange={handleInputChange} />
    </main>
  )
}
