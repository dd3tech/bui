import {
  ComponentProps,
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef
} from 'react'
import { XCircleIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import { useModalManager } from 'hooks'
import Text, { TextVariantType } from '../Typography'

export interface IAsideModalProps extends ComponentProps<'aside'> {
  /**
   * This prop is used to set the title of the modal.
   * It expects a string that represents the title to be displayed in the modal.
   */
  title: string
  /**
   * This prop is used to set the variant of the title in the modal.
   * It expects a value of TextVariantType type that represents the variant of the title displayed in the modal.
   */
  titleVariant?: TextVariantType
  /**
   * This prop is used to control whether the modal is open or closed.
   * It expects a boolean value (true or false) that determines whether the modal is open (true) or closed (false).
   */
  open: boolean
  /**
   * This prop is used to provide a callback function that will be executed when the modal is closed.
   * It expects a function that takes no arguments and returns no value (void).
   */
  onClose: () => void
  /**
   * This prop is optional (default false) and is used to control whether the ability to close the modal by pressing the Escape key is disabled or enabled.
   * It expects a boolean value (true or false) that determines whether the Escape key closing function is enabled (false) or disabled (true)
   */
  disableEscapeKeyDown?: boolean
  /**
   * This prop is used to pass a children
   */
  children: ReactNode
}

const AsideModal: FC<IAsideModalProps> = ({
  title,
  titleVariant = 'h4',
  open,
  onClose,
  disableEscapeKeyDown,
  children,
  ...otherProps
}) => {
  const { isOpen, handleModalClose } = useModalManager({
    open,
    onClose,
    disableEscapeKeyDown
  })

  const asideModalRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!asideModalRef.current) return
    asideModalRef.current.style.maxHeight = `calc(100vh - ${asideModalRef.current.offsetTop}px)`
  }, [isOpen])

  return (
    <aside
      role="aside-modal"
      className={composeClasses(
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'fixed top-20 right-0 w-full lg:w-8/12 max-w-5xl h-full px-10 py-7 border-t-0 shadow-lg',
        'bg-white overflow-auto transform transition-all duration-300 ease-linear z-40'
      )}
      ref={asideModalRef}
      {...otherProps}
    >
      <div className="flex justify-between items-center">
        <Text variant={titleVariant} bold>
          {title}
        </Text>
        <div
          role="btn-close"
          className="text-info cursor-pointer hover:text-primary transition ease-in-out duration-300"
          onClick={handleModalClose}
        >
          <XCircleIcon className="w-6" />
        </div>
      </div>
      {children}
    </aside>
  )
}

export default AsideModal