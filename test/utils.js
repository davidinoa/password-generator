import React from 'react'
import PropTypes from 'prop-types'
import { render as rtlRender } from '@testing-library/react'

function render(ui, Provider, options) {
  function Wrapper({ children }) {
    return Provider ? <Provider>{children}</Provider> : <></>
  }

  Wrapper.propTypes = { children: PropTypes.node }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { render }
