export function SquareMenu({ color = 'currentColor', size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 3C1 1.89543 1.89543 1 3 1H5C6.10457 1 7 1.89543 7 3V5C7 6.10457 6.10457 7 5 7H3C1.89543 7 1 6.10457 1 5V3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 3C11 1.89543 11.8954 1 13 1H15C16.1046 1 17 1.89543 17 3V5C17 6.10457 16.1046 7 15 7H13C11.8954 7 11 6.10457 11 5V3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 13C1 11.8954 1.89543 11 3 11H5C6.10457 11 7 11.8954 7 13V15C7 16.1046 6.10457 17 5 17H3C1.89543 17 1 16.1046 1 15V13Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
