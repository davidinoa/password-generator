import { PropsWithChildren } from 'react'
import { useTransition, animated, SpringValue } from 'react-spring'
import styled from 'styled-components'
import { modes } from '@/config'
import PasswordParams from '@/components/PasswordParams'
// import PassphraseParams from '@/components/PassphraseParams'
import { media } from '@/styles/helpers'
import { InputEvents, Mode, StyledProps, TParams } from '@/types'

const Styles = styled.div`
  background: white;
  margin: 0 -2rem;
  position: relative;
  transition: all 300ms;
  p {
    font-size: 0.8em;
  }
  ${media.tablet`
    border-radius: ${(p: StyledProps) => p.theme.borderRadius} ${(
    p: StyledProps
  ) => p.theme.borderRadius} 0 0;
    margin: 0;
  `}
`

type AnimatedTabProps = {
  style: {
    opacity: SpringValue<number>
    transform: SpringValue<string>
  }
} & PropsWithChildren

const AnimatedTab = ({ children, style }: AnimatedTabProps) => {
  return <animated.div style={style}>{children}</animated.div>
}

type Props = {
  mode: Mode
  values: TParams
  onChange: (e: InputEvents) => void
}

export default function Params({ mode, values, onChange }: Props) {
  const tabTransitions = useTransition(mode, {
    config: { duration: 200 },
    initial: { opacity: 1 },
    from: { opacity: 0, transform: 'scale(1.05)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, position: 'absolute', transform: 'scale(0.8)' },
  })

  return (
    <Styles>
      {tabTransitions((props, item) => {
        return (
          <AnimatedTab style={props}>
            {item === modes.PW ? (
              <PasswordParams values={values} onChange={onChange} />
            ) : (
              <div>Passphrase</div>
              // <PassphraseParams
              //   values={values}
              //   onChange={onChange}
              // />
            )}
          </AnimatedTab>
        )
      })}
    </Styles>
  )
}
