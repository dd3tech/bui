import { Link } from '../Link'
import { Wrapper } from '../Wrapper'
import Language from './Language'

interface Props {
  logoUrl: string
  logoWidth?: number
  logoHeight?: number
  logoName?: string
  LinkComponent?: React.ComponentType<any>
}

function Navbar({ logoUrl, logoWidth, logoHeight, logoName, LinkComponent }: Props) {
    return (
        <nav>
            <Wrapper className="flex items-center justify-between" paddingVertical={6} maxWidth="full">
                <Link LinkComponent={LinkComponent} to="/">
                    <figure className="block">
                        <img width={logoWidth} height={logoHeight} src={logoUrl} alt={logoName ?? 'Logo Name'} />
                    </figure>
                </Link>
                <Language />
            </Wrapper>
        </nav>
    )
}

export default Navbar
