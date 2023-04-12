import Wrapper from '../Wrapper/Wrapper'
import Anchor from '../Anchor'
import { Language } from './Language'

interface Props {
  logoUrl: string
  logoWidth?: number
  logoHeight?: number
  logoName?: string
  LinkComponent?: React.ComponentType<any>
}

export function Navbar({
  logoUrl,
  logoWidth,
  logoHeight,
  logoName,
  LinkComponent
}: Props) {
  return (
    <nav>
      <Wrapper
        className="flex items-center justify-between"
        paddingY="6"
        maxWidth="full"
      >
        <Anchor as={LinkComponent} to="/">
          <figure className="block">
            <img
              width={logoWidth}
              height={logoHeight}
              src={logoUrl}
              alt={logoName ?? 'Logo Name'}
            />
          </figure>
        </Anchor>
        <Language />
      </Wrapper>
    </nav>
  )
}
