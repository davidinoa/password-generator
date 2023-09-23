import { ChangeEvent, TouchEvent } from 'react'
import { delimiters, initParams, modes } from './config'
import theme from './styles/theme'

export type InputTouchEvent = TouchEvent<HTMLInputElement>
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type InputEvents = InputTouchEvent | InputChangeEvent

export type Modes = typeof modes
export type Mode = Modes[keyof Modes]

type Delimiters = typeof delimiters
export type DelimiterKey = keyof Delimiters
export type TParams = typeof initParams
export type PasswordParamKey = keyof TParams['password']

export type Theme = typeof theme

export type StyledProps = {
  theme: Theme
}
