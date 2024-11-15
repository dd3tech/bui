import React, { ReactNode } from 'react'

import TopPage from 'components/TopPage'
import type { TopPageProps } from 'components/TopPage'
import {
  ArrowSelector,
  ArrowSelectorProps,
  FilterBar,
  FilterLabelProps,
  FilterSearch,
  FilterSearchProps,
  ToggleButtonProps
} from 'components/Filters'
import { Button } from 'components/Buttons'
import { Flex } from 'components/Layout'
import DynamicHeroIcon, { DynamicHeroIconProps } from 'common/DynamicHeroIcon'
import Text from '../Typography'
import DropdownCheckbox, {
  DropdownCheckboxProps
} from '../Filters/DropdownCheckbox'
import DropdownRadio, { DropdownRadioProps } from '../Filters/DropdownRadio'
import DropdownRange, { DropdownRangeProps } from '../Filters/DropdownRange'
import DropdownRangeSlider, {
  DropdownRangeSliderProps
} from '../Filters/DropdownRangeSlider'
import Select, { SelectProps } from 'components/Form/Select'

interface TemplatePageProps extends TopPageProps {
  children?: ReactNode
  footer?: ReactNode
  search?: FilterSearchProps
  results?: FilterLabelProps
  viewToggle?: ToggleButtonProps
  filters?: {
    dropdownCheckbox?: DropdownCheckboxProps[]
    dropdownRadio?: DropdownRadioProps[]
    dropdownRange?: DropdownRangeProps[]
    dropdownRangeSlider?: DropdownRangeSliderProps[]
    select?: SelectProps[]
  }
  clearFilters?: {
    onClick: () => void
    label: string
  }
  callToAction?: {
    onClick: () => void
    label: string
    icon: DynamicHeroIconProps['icon']
  }
  arrowSelector?: ArrowSelectorProps
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  children,
  footer,
  search,
  results,
  viewToggle,
  filters,
  clearFilters,
  callToAction,
  arrowSelector,
  ...props
}) => {
  const filterComponents = [
    ...(filters?.select?.map((props, index) => (
      <Select
        style={{ height: '40px', marginTop: '-1px', background: '#fff' }}
        {...props}
        key={`selected-${index}`}
      />
    )) || []),
    ...(filters?.dropdownCheckbox?.map((props, index) => (
      <DropdownCheckbox {...props} key={`dropdown-checkbox-${index}`} />
    )) || []),
    ...(filters?.dropdownRadio?.map((props, index) => (
      <DropdownRadio {...props} key={`dropdown-radio-${index}`} />
    )) || []),
    ...(filters?.dropdownRange?.map((props, index) => (
      <DropdownRange {...props} key={`dropdown-range-${index}`} />
    )) || []),
    ...(filters?.dropdownRangeSlider?.map((props, index) => (
      <DropdownRangeSlider {...props} key={`dropdown-range-slider-${index}`} />
    )) || [])
  ].slice(0, 3)

  const propsArray = [
    search,
    results,
    viewToggle,
    filters,
    clearFilters,
    callToAction,
    arrowSelector
  ]
  const definedPropsCount = propsArray.filter(
    (prop) => prop !== undefined && prop !== null
  ).length

  const smallSearch = definedPropsCount > 6

  return (
    <div>
      <TopPage {...props} />
      <div className="px-5">
        <div className="my-4">
          <FilterBar className="">
            {search && (
              <FilterBar.Section
                className={smallSearch ? 'w-12 xl:w-60' : 'w-60'}
              >
                <FilterSearch {...search} smallSearch={smallSearch} />
              </FilterBar.Section>
            )}

            {results && (
              <FilterBar.Section
                className="ml-4 gap-2 flex justify-center -pr-6"
                borderRight
              >
                <FilterBar.Label {...results} />
                {viewToggle && <FilterBar.Toggle {...viewToggle} />}
              </FilterBar.Section>
            )}
            {arrowSelector && (
              <FilterBar.Section
                borderRight
                className="flex justify-center -ml-8"
              >
                <ArrowSelector {...arrowSelector} />
              </FilterBar.Section>
            )}
            {!!filterComponents.length && (
              <FilterBar.Section
                borderRight
                className="flex justify-center items-center gap-2"
              >
                {filterComponents}
              </FilterBar.Section>
            )}
            <Flex
              className="w-full"
              justifyContent="end"
              alignItems="center"
              gap="4"
            >
              {clearFilters && (
                <FilterBar.Section>
                  <Button variant="ghost" onClick={clearFilters.onClick}>
                    <Text textMuted500>{clearFilters.label}</Text>
                  </Button>
                </FilterBar.Section>
              )}
              {callToAction && (
                <FilterBar.Section>
                  <Button
                    variant="secondary"
                    onClick={callToAction.onClick}
                    className="whitespace-nowrap w-36 flex flex-grow justify-center"
                  >
                    <Flex gap="2" alignItems="center" justifyContent="center">
                      <Text>{callToAction.label}</Text>
                      <DynamicHeroIcon
                        icon={callToAction.icon}
                        className="w-5 h-5 text-blue-600"
                      />
                    </Flex>
                  </Button>
                </FilterBar.Section>
              )}
            </Flex>
          </FilterBar>
        </div>
        {children}
      </div>
      {footer && (
        <div className="fixed bottom-0 left-5 right-5">
          <div className="mb-2">{footer}</div>
        </div>
      )}
    </div>
  )
}

export default TemplatePage
