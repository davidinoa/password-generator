import { ChangeEvent, TouchEvent } from 'react'
import { initParams, modes } from './config'
import theme from './styles/theme'

export type InputTouchEvent = TouchEvent<HTMLInputElement>
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type InputEvents = InputTouchEvent | InputChangeEvent

export type Modes = typeof modes
export type Mode = Modes[keyof Modes]

export type TParams = typeof initParams

export type Theme = typeof theme

export type StyledProps = {
  theme: Theme
}
