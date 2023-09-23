export const strengthsEnum = {
  OK: 'kinda weak',
  GOOD: 'pretty decent',
  STRONG: 'super strong',
} as const

export const modes = {
  PW: 'password',
  PP: 'passphrase',
} as const

export const localStorageKeys = {
  params: `password-generator-params`,
  mode: `password-generator-mode`,
} as const

export const initParams = {
  [modes.PW]: {
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  },
  [modes.PP]: {
    length: 5,
    delimiter: 'hyphen',
  },
}
