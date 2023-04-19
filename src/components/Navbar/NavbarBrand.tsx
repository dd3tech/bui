import { composeClasses } from 'lib/classes'

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  hiddenIn?: string
  imgSrc?: string
  imgHeight?: number
  imgWidth?: number
  name?: string
  children?: React.ReactNode
}

const NavbarBrand = ({
  hiddenIn,
  name,
  imgSrc,
  imgHeight = 30,
  imgWidth,
  ...props
}: NavbarBrandProps) => {
  return (
    <div
      {...props}
      className={composeClasses(
        'items-center gap-2',
        hiddenIn ? `hidden ${hiddenIn}:flex` : 'flex',
        props.className
      )}
    >
      {imgSrc ? (
        <>
          {
            <figure className="block">
              <img
                style={{ height: imgHeight, width: imgWidth }}
                src={imgSrc}
              />
            </figure>
          }
          {name}
        </>
      ) : (
        props.children
      )}
    </div>
  )
}

export default NavbarBrand
