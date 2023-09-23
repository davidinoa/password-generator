import React, { useCallback, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { generatePassword } from '@/lib/cryptoLogic'

const convertToCharCodeArray = (string: string) => {
  return string.split('').map((ch) => ch.charCodeAt(0))
}

const normalizeCharCode = (code: number) => {
  // return a letter or number when when spring bounces beyond char code range
  // tried setting clamp -> true in the spring config, but it didn't seem to have the intended effect
  // react-spring docs are less helpful than they could be
  if (code === 64) return 66 // no @
  if (code === 91 || code === 92 || code === 93) return 89 // no [
  if (code === 94 || code === 95 || code === 96) return 98 // no `
  if (code === 123) return 121 // no {
  if (code === 47) return 49 // no /
  if (code === 58) return 56 // no :
  return code
}

const convertToString = (
  charCodeArray: readonly number[],
  alphaNumeric = false
) => {
  // reduce profiles 5-20x faster than the code above
  return charCodeArray.reduce((result, code) => {
    const normalized = alphaNumeric
      ? normalizeCharCode(Math.floor(code))
      : Math.floor(code)
    return result + String.fromCharCode(normalized)
  }, '')
}

type Props = {
  children: string
  duration?: number
  scrambleOnClick?: boolean
  alphaNumeric?: boolean
}

export default function SecretString({
  children,
  duration,
  scrambleOnClick = false,
  alphaNumeric = false,
}: Props) {
  const from = convertToCharCodeArray(generatePassword(children.length))
  const to = convertToCharCodeArray(children)
  const precision = 1
  const friction = 50
  const config = {
    // low precision since we're interpolating integers
    // cuts number of operations by ~1/2
    config: { precision, friction, duration },
    from: {
      chars: from,
    },
    to: {
      chars: to,
    },
  }

  const [spring, setSpring] = useSpring(() => config)

  const scramble = useCallback(() => {
    if (scrambleOnClick) {
      setSpring({
        config: { duration: 100, precision },
        to: {
          chars: convertToCharCodeArray(generatePassword(children.length)),
        },
        onRest: () => {
          setSpring({
            config: { duration: undefined, precision, friction },
            to: { chars: convertToCharCodeArray(children) },
          })
        },
      })
    }
  }, [children, scrambleOnClick, setSpring])

  useEffect(() => {
    scramble()
  }, [scramble])

  return (
    <animated.span onClick={scramble}>
      {spring.chars.to((...charCodes) =>
        convertToString(charCodes, alphaNumeric)
      )}
    </animated.span>
  )
}
