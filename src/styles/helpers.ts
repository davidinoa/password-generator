// @ts-nocheck
import { RuleSet, css } from 'styled-components'

const sizes = {
  desktop: 1050,
  tablet: 760,
  phone: 500,
}

type Size = keyof typeof sizes
type Media = Record<Size, (...args: any[]) => RuleSet<object>>

// Iterate through the sizes and create a media template
const sizeKeys = Object.keys(sizes) as Size[]
export const media = sizeKeys.reduce<Media>((acc, label) => {
  acc[label] = (...args: any[]) => css`
    @media (min-width: ${sizes[label] / 16}rem) {
      ${css(...args)}
    }
  `
  return acc
}, {} as Media)
