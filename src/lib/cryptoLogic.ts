import { Mode, PasswordParamKey, TParams } from '@/types'
import wordList from './wordList'
import { delimiters, modes } from '@/config'

export const getRandomSecure = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32

export const getRandomElement = <T>(array: T[]) => {
  return array[Math.floor(getRandomSecure() * array.length)]
}

const chars = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split(''),
  symbols: '~!@#$%^&*_-+?.:;'.split(''),
} as const

type Chars = typeof chars
type CharKey = keyof Chars

export const generatePassword = (
  length: number,
  flags?: Partial<Record<PasswordParamKey, boolean | number>>
) => {
  flags = { upper: true, lower: true, numbers: true, symbols: true, ...flags }

  let charPool: string[] = []
  for (const key in chars) {
    const typedKey = key as CharKey
    if (flags[typedKey]) charPool = [...charPool, ...chars[typedKey]]
  }

  return Array(length)
    .fill(null)
    .map(() => getRandomElement(charPool))
    .join('')
}

const interleaveWithNumbers = (array: string[]) => {
  return array.reduce<(number | string)[]>((acc, cur, i) => {
    if (i !== array.length - 1) {
      return [...acc, cur, getRandomElement(chars.numbers)]
    } else {
      return [...acc, cur]
    }
  }, [] as (number | string)[])
}

export const generatePassphrase = (
  numWords: number,
  params: TParams['passphrase']
) => {
  if (!(params.delimiter in delimiters)) {
    params.delimiter = 'hyphen'
  }

  const phrase = new Set<string>()
  while (phrase.size < numWords) phrase.add(getRandomElement(wordList))
  if (params.delimiter === 'number') {
    return interleaveWithNumbers([...phrase]).join('')
  } else {
    return [...phrase].join(delimiters[params.delimiter])
  }
}

export const generatePasswords = (
  numPasswords = 3,
  params: TParams['password']
) => {
  return Array(numPasswords)
    .fill(null)
    .map(() => generatePassword(params.length, params))
}

export const generatePassphrases = (
  numPhrases = 3,
  params: TParams['passphrase']
) => {
  return Array(numPhrases)
    .fill(null)
    .map(() => generatePassphrase(params.length, params))
}

export const getEntropy = (params: TParams, mode: Mode) => {
  const count = params[mode].length
  if (mode === modes.PP) {
    const ppWordListCount = wordList.length
    const ppEntropyPerWord = Math.log2(ppWordListCount)
    return params[mode].delimiter === 'number'
      ? ppEntropyPerWord * count + (count - 1) * 10
      : ppEntropyPerWord * count
  } else {
    const flags = Object.keys(chars) as CharKey[]
    const charSpace = flags.reduce((total, flag) => {
      return params[mode][flag] ? total + chars[flag].length : total
    }, 0)
    const pwEntropyPerChar = Math.log2(charSpace)
    return pwEntropyPerChar * count
  }
}
