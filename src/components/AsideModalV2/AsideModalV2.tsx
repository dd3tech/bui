import { ComponentProps, FC, ReactNode, useEffect, useRef } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import { useModalManager } from 'hooks'
import DynamicHeroIcon, { DynamicHeroIconProps } from 'common/DynamicHeroIcon'
import { Flex } from 'components/Layout'
import { Button, IButtonProps } from 'components/Buttons'
import { FilterSearch, FilterSearchProps } from 'components/Filters'
import { Tab, TabGroup, TabPanel } from 'components/Tabs'
import Divider from 'components/Divider'
import Text, { TextVariantType } from '../Typography'
import Tag from 'components/Tag'
import Tooltip from '../Tooltip/Tooltip'
import ShapeButton from '../Buttons/ShapeButton'

type ModalPosition = 'left' | 'right'

export interface ModalButton extends Partial<IButtonProps> {
  label: string
  tooltip?: string
}

export interface ModalDescription {
  label?: string
  icon?: DynamicHeroIconProps['icon']
  classIcon?: string
}

export interface ModalTabItem {
  label: string
  disabled?: boolean
  description?: ModalDescription
  buttons?: ModalButton[]
  search?: FilterSearchProps
  className?: string
  id?: string
  role?: string
}

export interface ModalTabs {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  items: ModalTabItem[]
}

export interface AsideModalProps extends ComponentProps<'aside'> {
  title: string
  titleVariant?: TextVariantType
  position?: ModalPosition
  open: boolean
  onClose: () => void
  disableEscapeKeyDown?: boolean
  children: ReactNode
  isStickyTitle?: boolean
  description?: ModalDescription
  buttons?: ModalButton[]
  search?: FilterSearchProps
  tabs?: ModalTabs
  tagTitle?: {
    variant: 'primary' | 'secondary' | 'success' | 'warning'
    text: string
  }
}

const AsideModalV2: FC<AsideModalProps> = ({
  title,
  titleVariant = 'h4',
  position = 'right',
  open,
  onClose,
  disableEscapeKeyDown,
  isStickyTitle,
  description,
  buttons,
  children,
  search,
  tabs,
  tagTitle,
  ...otherProps
}) => {
  const isRightPosition = position === 'right'
  const { isOpen, handleModalClose } = useModalManager({
    open,
    onClose,
    disableEscapeKeyDown
  })

  const asideModalRef = useRef<HTMLDivElement>(null)

  const translateByPosition = isRightPosition
    ? { base: 'right-0', open: 'translate-x-0', close: 'translate-x-full' }
    : { base: 'left-0', open: 'translate-x-0', close: '-translate-x-full' }

  useEffect(() => {
    if (!asideModalRef.current) return
    asideModalRef.current.style.maxHeight = `calc(100vh - ${asideModalRef.current.offsetTop}px)`
  }, [isOpen])

  const renderHeaderContent = () => (
    <>
      <Divider light className="mt-1 bg-gray-50" />
      <Flex gap="4" className="flex-col">
        <Flex gap="2" alignItems="center" justifyContent="between">
          {description && (
            <Flex gap="1" alignItems="center">
              {description.icon && (
                <DynamicHeroIcon
                  icon={description.icon}
                  className={composeClasses(description.classIcon)}
                />
              )}
              {description.label && (
                <Text size="sm" className="flex-1">
                  {description.label}
                </Text>
              )}
            </Flex>
          )}

          {buttons?.length && (
            <Flex gap="4" className="flex-shrink-0">
              {buttons.map((button, index) =>
                button.tooltip ? (
                  <Tooltip key={`btn-${index}`} content={button.tooltip}>
                    <Button
                      role={button.role}
                      variant={button.variant || 'primary'}
                      size={button.size || 'small'}
                      onClick={button.onClick}
                      paddingX="10"
                      paddingY="2"
                      disabled={button.disabled}
                      isLoading={button.isLoading}
                    >
                      {button.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    role={button.role}
                    key={`btn-${index}`}
                    variant={button.variant || 'primary'}
                    size={button.size || 'small'}
                    onClick={button.onClick}
                    paddingX="10"
                    paddingY="2"
                    disabled={button.disabled}
                    isLoading={button.isLoading}
                  >
                    {button.label}
                  </Button>
                )
              )}
            </Flex>
          )}
        </Flex>
        {search && <FilterSearch data-testid="filter-search" {...search} />}
      </Flex>
    </>
  )

  const renderTabContent = (tab: ModalTabItem, index: number) => {
    if (!tab?.description && !tab?.buttons && !tab.search) return null

    return (
      <TabPanel
        className="p-0"
        key={`tab-panel-${index}`}
        index={index}
        value={tabs?.value || 0}
      >
        {(tab?.description || tab?.buttons || tab.search) && (
          <Flex gap="4" className="flex-col">
            <Flex gap="2" alignItems="center" justifyContent="between">
              <Flex gap="1" alignItems="center">
                {tab?.description?.icon && (
                  <DynamicHeroIcon
                    icon={tab.description.icon}
                    className={tab?.description?.classIcon}
                  />
                )}
                {tab?.description?.label && (
                  <Text size="sm" className="flex-1">
                    {tab.description.label}
                  </Text>
                )}
              </Flex>
              {tab?.buttons?.length && (
                <Flex gap="4" alignItems="end" className="flex-shrink-0">
                  {tab?.buttons?.map((button, btnIndex) => (
                    <Button
                      key={`tab-btn-${btnIndex}`}
                      variant={button?.variant || 'primary'}
                      size={button?.size || 'small'}
                      onClick={button?.onClick}
                      paddingX={button?.paddingX || '8'}
                      paddingY={button?.paddingY || '2'}
                      role={button?.role}
                      disabled={button?.disabled}
                      isLoading={button?.isLoading}
                    >
                      {button.label}
                    </Button>
                  ))}
                </Flex>
              )}
            </Flex>
            {tab?.search && (
              <FilterSearch data-testid="filter-search" {...tab.search} />
            )}
          </Flex>
        )}
      </TabPanel>
    )
  }

  return (
    <aside
      role="aside-modal"
      className={composeClasses(
        translateByPosition.base,
        isOpen ? translateByPosition.open : translateByPosition.close,
        'fixed top-0 w-full lg:w-8/12 max-w-5xl h-full border-t-0 shadow-lg',
        'bg-white overflow-auto transform transition-all duration-300 ease-linear z-40'
      )}
      ref={asideModalRef}
      {...otherProps}
    >
      <Flex
        gap="4"
        className={composeClasses(
          'bg-gray-50 px-10 pt-6 pb-4 flex-col',
          isStickyTitle && 'sticky top-0 z-50'
        )}
      >
        <Flex className="w-full" justifyContent="between" alignItems="center">
          <Flex gap="6" alignItems="center">
            <Text variant={titleVariant} bold>
              {title}
            </Text>
            {tagTitle && (
              <Tag variant={tagTitle.variant} text={tagTitle.text} />
            )}
          </Flex>
          <ShapeButton.CircleButton
            data-testid="close-button"
            width="34px"
            height="34px"
            icon={<XIcon className="w-4" />}
            onClick={() => handleModalClose(true)}
          />
        </Flex>
        {tabs?.items?.length ? (
          <>
            <TabGroup value={tabs.value} onChange={tabs.setValue}>
              {tabs.items.map((tab, index) => (
                <Tab
                  id={tab?.id}
                  className={tab?.className}
                  key={`tab-${index}`}
                  label={tab.label}
                  disabled={tab.disabled}
                />
              ))}
            </TabGroup>
            {tabs.items.map(renderTabContent)}
          </>
        ) : (
          renderHeaderContent()
        )}
      </Flex>
      <div className="pt-6 px-10 pb-10">{children}</div>
    </aside>
  )
}

export default AsideModalV2
