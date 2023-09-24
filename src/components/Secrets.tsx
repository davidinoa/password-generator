import { useState, useRef, useEffect, ReactNode } from 'react'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import { media } from '@/styles/helpers'
import SecretString from '@/components/common/SecretString'
import { Theme } from '@/types'

type StylesProps = {
  theme: Theme
}

const Styles = styled.div<StylesProps>`
  background: ${(p) => p.theme.colors.offBlack};
  color: ${(p) => p.theme.colors.offWhite};
  margin: 0 -2rem 1.5rem;
  padding: 2rem;
  ${media.tablet`
    padding: 1.5rem;
    border-radius: 0 0 ${(p: StylesProps) => p.theme.borderRadius} ${(
    p: StylesProps
  ) => p.theme.borderRadius};
    margin: 0;
  `}
`

type SecretStylesProps = {
  $length: number
  className?: string
}

const SecretStyles = styled.div<SecretStylesProps>`
  font-family: ${(p) => p.theme.fontFamilyFixed};
  margin-bottom: 0.75em;
  font-size: ${(p) =>
    p.$length < 14 ? '1.75em' : p.$length > 38 ? '1.1em' : '1.3em'};
  height: ${(p) =>
    p.$length < 14 ? '6rem' : p.$length > 22 ? '10rem' : '8rem'};
  ${media.tablet`
    font-size: ${(p: SecretStylesProps) =>
      p.$length < 14 ? '1.75em' : p.$length > 35 ? '1.1em' : '1.3em'};
    height: ${(p: SecretStylesProps) => (p.$length < 14 ? '6rem' : '8rem')};
  `}
  line-height: 1.2;
  padding: 0 1rem;
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: ${(p) => p.theme.borderRadius};
  position: relative;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: copy;
    background: hsla(0, 0%, 100%, 0.25);
  }
  &:before {
    content: 'Copied!';
    display: flex;
    color: ${(p) => p.theme.colors.offWhite};
    font-weight: bold;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms;
  }
  &.notify {
    color: hsla(0, 0%, 100%, 0.08);
  }
  &.notify:before {
    opacity: 1;
  }
`

type SecretProps = {
  children: ReactNode
  copyValue: string
  length: number
}

const Secret = ({ children, copyValue, length }: SecretProps) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  const copyAndNotify = () => {
    copy(copyValue)
    setCopied(true)
    if (!timer.current) {
      timer.current = window.setTimeout(() => {
        setCopied(false)
        timer.current = null
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      timer.current && window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <SecretStyles
      onClick={copyAndNotify}
      className={copied ? 'notify' : ''}
      title="Click to copy"
      $length={length}
    >
      {children}
    </SecretStyles>
  )
}

type SecretsProps = {
  outputs: string[]
}

export default function Secrets({ outputs }: SecretsProps) {
  return (
    <Styles>
      {outputs.map((secret) => (
        <Secret key={secret} copyValue={secret} length={secret.length}>
          <SecretString>{secret}</SecretString>
        </Secret>
      ))}
    </Styles>
  )
}
