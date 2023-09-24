import React, { useState } from 'react'
import styled from 'styled-components'
import { media } from '@/styles/helpers'
import { Mode } from '@/types'

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
    text-transform: capitalize;
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
  choices: Mode[]
  onToggle: (value: Mode) => void
  initial: Mode
}

export default function ChoiceToggle({ choices, onToggle, initial }: Props) {
  const [selected, setSelected] = useState<Mode>(initial)

  const handleClick = (choice: Mode) => {
    setSelected(choice)
    onToggle(choice)
  }

  return (
    <Styles>
      {choices.map((choice) => (
        <button
          key={choice}
          className={selected === choice ? 'selected' : undefined}
          onClick={() => handleClick(choice)}
        >
          {choice}
        </button>
      ))}
    </Styles>
  )
}
