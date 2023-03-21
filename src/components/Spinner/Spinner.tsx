export interface SpinnerProps {
  color?: string
  className?: string
  pageLoader?: boolean
  width?: string
  height?: string
  border?: number
}

function Spinner({
  color = '#1d4ed8',
  pageLoader = false,
  width = '2rem',
  height = '2rem',
  border = 4
}: SpinnerProps) {
  if (pageLoader) {
    width = '8rem'
    height = '8rem'
    border = 8
  }

  return (
    <div className="flex justify-center items-center" role="spinner">
      <div
        style={{
          borderTopColor: color,
          width: width,
          height: height,
          borderWidth: border
        }}
        className={`border-t-blue-700 animate-spin rounded-full border-gray-300`}
      />
    </div>
  )
}

export default Spinner
