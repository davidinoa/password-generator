import React, { useState } from 'react'
import styled from 'styled-components'
import { media } from '@/styles/helpers'

const Styles = styled.div`
  display: flex;
  overflow: hidden;
  ${media.tablet`
    padding: 0 0.5em;
  `}
  button {
    font-size: 1em;
    font-family: ${(p) => p.theme.fontFamily};
    font-weight: bold;
    border: none;
    background: none;
    margin: 0;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-radius: ${(p) => p.theme.borderRadius} ${(p) => p.theme.borderRadius}
      0 0;
  }
  button:hover {
    background: hsla(0, 0%, 94%, 0.5);
  }
  button:focus {
    outline: none;
  }
  button.selected {
    background: white;
  }
  button.selected:hover {
    background: white;
    cursor: default;
  }
`

type Props = {
  choices: { [key: string]: any }
  onToggle: (value: any) => void
  initial: string
}

export default function ChoiceToggle({ choices, onToggle, initial }: Props) {
  const labels = Object.keys(choices)
  const [selected, setSelected] = useState(initial)

  const handleClick = (label: string) => {
    setSelected(label)
    onToggle(choices[label])
  }

  return (
    <Styles>
      {labels.map((label) => (
        <button
          key={label}
          className={selected === label ? 'selected' : undefined}
          onClick={() => handleClick(label)}
        >
          {label}
        </button>
      ))}
    </Styles>
  )
}
