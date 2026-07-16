import '@testing-library/jest-dom'

const originalWarn = console.error

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0]?.includes('ReactDOM.render is no longer supported')
  ) {
    return
  }

  originalWarn(...args)
}
