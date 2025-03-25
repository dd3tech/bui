import { ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Flex, Text, Button, Modal } from 'components'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  label?: string
  className?: string
}

interface ModalCustomProps {
  title: string
  showModal: boolean
  width?: string
  onClose: () => void
  children: ReactNode
  onSubmit: () => void
  isDisabledButton?: boolean
  customButtonRight?: CustomButtonProps
  customButtonLeft?: CustomButtonProps
}

const ModalV2 = ({
  title,
  showModal,
  onClose,
  children,
  onSubmit,
  isDisabledButton,
  customButtonRight,
  customButtonLeft,
  width = '670px'
}: ModalCustomProps) => {
  return (
    <Modal
      width={width}
      active={showModal}
      setCloseModal={onClose}
      iconBtnClose={<XIcon width={20} height={20} />}
      className="border-1 border-gray-50 box-border"
    >
      <Flex className="mt-1 px-6 border-b pb-6 py-1">
        <Text bold className="text-2xl">
          {title}
        </Text>
      </Flex>
      <Flex className="px-6 mt-8" gap="2">
        {children}
      </Flex>
      <Flex
        className="mt-8 bg-gray-50 px-6 -mb-4 py-6 border-t rounded-b-2xl"
        justifyContent="end"
        gap="6"
      >
        <Button
          onClick={onClose}
          className={customButtonLeft?.className ?? 'w-32 text-nowrap'}
          variant={customButtonLeft?.variant ?? 'secondary'}
        >
          {customButtonLeft?.label ?? 'Cancel'}
        </Button>
        <Button
          disabled={isDisabledButton}
          onClick={onSubmit}
          className={customButtonRight?.className ?? 'w-32 text-nowrap'}
          variant={customButtonRight?.variant ?? 'primary'}
        >
          {customButtonRight?.label ?? 'Save'}
        </Button>
      </Flex>
    </Modal>
  )
}

export default ModalV2
