'use client'

import styled from 'styled-components'
import theme from '@/styles/theme'
import { InputEvents, InputTouchEvent } from '@/types'

const { inputHighlightColor } = theme
const { offBlack, blue } = theme.colors

const Styles = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  label {
    display: inline-block;
    user-select: none;
  }
  span {
    font-size: 1.25em;
    font-weight: bold;
    width: 2.5em;
    text-align: center;
  }
  input {
    flex: 1;
    appearance: none;
    height: 0.5em;
    padding: 0.5rem;
    background: white;
    outline: none;
    transition: all 300ms;
    border-radius: ${(p) => p.theme.borderRadius};
    border: 0.1rem solid ${offBlack};
    font-size: 1em;
  }
  input:hover {
    border: 0.1rem solid ${blue};
  }
  /* Chrome, Opera, Safari, Edge */
  input::-webkit-slider-thumb {
    appearance: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: ${(p) => p.theme.borderRadius};
    border-radius: 50%;
    background: ${inputHighlightColor};
    cursor: pointer;
    border: none;
  }
  /* Firefox */
  input::-moz-range-thumb {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: ${inputHighlightColor};
    cursor: pointer;
    border: none;
  }
`

type Props = {
  title: string
  label: string
  name: string
  value: any
  onChange: (e: InputEvents) => void
  className?: string
  min?: number
  max?: number
}

export default function RangeSlider({
  title,
  label,
  name,
  value,
  onChange,
  className,
  min = 1,
  max = 100,
}: Props) {
  const handleTouchStart = (e: InputTouchEvent) => {
    const { clientX } = e.targetTouches[0]
    const touchX = clientX
    const rect = e.currentTarget.getBoundingClientRect()
    const sliderWidth = rect.width
    const x = touchX - rect.x
    const selection = x / sliderWidth
    const range = max - min
    const newValue = Math.floor(range * selection + min)
    if (newValue !== value) {
      e.currentTarget.value = String(newValue)
      onChange(e)
    }
  }

  return (
    <Styles className={className}>
      <label>{label}</label>
      <span suppressHydrationWarning>{value}</span>
      <input
        type="range"
        title={title}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onTouchStart={handleTouchStart}
      />
    </Styles>
  )
}
