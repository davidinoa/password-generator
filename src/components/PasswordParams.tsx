import React from 'react'
import styled, { css } from 'styled-components'
import { modes } from '@/config'
import { media } from '@/styles/helpers'
import InputRow from '@/components/common/InputRow'
import CheckBox from '@/components/common/CheckBox'
import RangeSlider from '@/components/common/RangeSlider'
import { InputEvents, TParams } from '@/types'

const Slider = styled(RangeSlider)`
  ${media.tablet`
    width: 70%;
  `}
`

const Styles = styled.div`
  padding: 2rem;
  .checkboxes {
    > div {
      flex-basis: 50%;
      margin-right: 0;
    }
  }
  ${media.tablet`    
  .checkboxes {
    > div {
      flex-basis: auto;
      margin-right: 3rem;
    }
  }
  `}
`

type Props = {
  values: TParams
  onChange: (e: InputEvents) => void
}

export default function PasswordParams({ values, onChange }: Props) {
  const pwValues = values[modes.PW]
  return (
    <Styles>
      <p>
        Good passwords are at least 12 characters long. If you can, include
        letters, numbers, & symbols in random order. Make it as long as your
        account provider will allow, you won’t be typing it anyway once you get
        a{' '}
        <a href="#about" title="Good password hygiene">
          password manager
        </a>
        .
      </p>
      <InputRow>
        <Slider
          label="Length"
          name="length"
          value={pwValues.length}
          min={8}
          max={48}
          onChange={onChange}
          title="Adjust password length"
        />
      </InputRow>
      Characters
      <InputRow className="checkboxes">
        <CheckBox
          label="abc"
          name="lower"
          checked={pwValues.lower}
          onChange={onChange}
          title="Include lowercase letter"
        />
        <CheckBox
          label="ABC"
          name="upper"
          checked={pwValues.upper}
          onChange={onChange}
          title="Include uppercase letter"
        />
        <CheckBox
          label="123"
          name="numbers"
          checked={pwValues.numbers}
          onChange={onChange}
          title="Include numbers"
        />
        <CheckBox
          label="$@!"
          name="symbols"
          checked={pwValues.symbols}
          onChange={onChange}
          title="Include symbols"
        />
      </InputRow>
    </Styles>
  )
}
