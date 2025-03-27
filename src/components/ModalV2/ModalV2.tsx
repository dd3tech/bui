import { ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Flex, Text, Button, Modal } from 'components'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  label?: string
  className?: string
  isDisabledButton?: boolean
  onClick: () => void
}

interface ModalCustomProps {
  title: string
  showModal: boolean
  width?: string
  onClose: () => void
  children: ReactNode
  buttonsModal?: CustomButtonProps[]
}

const ModalV2 = ({
  title,
  showModal,
  onClose,
  children,
  buttonsModal,
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
      {buttonsModal?.length && (
        <Flex
          className="mt-8 bg-gray-50 px-6 -mb-4 py-6 border-t rounded-b-2xl"
          justifyContent="end"
          gap="6"
        >
          {buttonsModal?.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              className={button.className ?? 'w-32 text-nowrap'}
              variant={button.variant ?? 'secondary'}
              disabled={button.isDisabledButton}
            >
              {button.label}
            </Button>
          ))}
        </Flex>
      )}
    </Modal>
  )
}

export default ModalV2
