/*
 * Copyright (c) DD360 and its affiliates.
 */

import { FC, ReactNode } from 'react'
import TopPage from 'components/TopPage'
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
import Select, { SelectProps } from 'components/Form/Select'
import DynamicHeroIcon, { DynamicHeroIconProps } from 'common/DynamicHeroIcon'
import Text from '../Typography'
import DropdownCheckbox, {
  DropdownCheckboxProps
} from '../Filters/DropdownCheckbox'
import DropdownRadio, { DropdownRadioProps } from '../Filters/DropdownRadio'
import DropdownRange, { DropdownRangeProps } from '../Filters/DropdownRange'
import { TopPageProps } from '../TopPage/TopPage'
import DropdownRangeSlider, {
  DropdownRangeSliderProps
} from '../Filters/DropdownRangeSlider'

interface FiltersProps {
  dropdownCheckbox?: DropdownCheckboxProps[]
  dropdownRadio?: DropdownRadioProps[]
  dropdownRange?: DropdownRangeProps[]
  dropdownRangeSlider?: DropdownRangeSliderProps[]
  select?: SelectProps[]
}

interface ClearFiltersProps {
  onClick: () => void
  label: string
}

interface CallToActionProps {
  onClick: () => void
  label: string
  icon: DynamicHeroIconProps['icon']
}
interface PageTemplateProps extends TopPageProps {
  /** Main content rendered inside the page template */
  children?: ReactNode
  /** Footer displayed at the bottom of the page */
  footer?: ReactNode
  /** Search bar properties like placeholder, value, and onChange */
  search?: FilterSearchProps
  /** Displays result information such as number of results and label */
  results?: FilterLabelProps
  /** Toggle button to switch views (e.g., table or card) */
  viewToggle?: ToggleButtonProps
  /** Filters such as dropdowns, checkboxes, or sliders */
  filters?: FiltersProps
  /** Button to clear applied filters, with label and onClick */
  clearFilters?: ClearFiltersProps
  /** Primary call-to-action button with label, icon, and onClick */
  callToAction?: CallToActionProps
  /** Arrow selector for navigating between items or pages */
  arrowSelector?: ArrowSelectorProps
  /** ARIA role for the page container */
  role?: string
  /** Hides the filter bar when true */
  hiddenFilterBar?: boolean
}

const PageTemplate: FC<PageTemplateProps> = ({
  children,
  footer,
  search,
  results,
  viewToggle,
  filters,
  clearFilters,
  callToAction,
  arrowSelector,
  role,
  hiddenFilterBar,
  ...otherProps
}) => {
  const filterComponents = [
    ...(filters?.select?.map((props, index) => (
      <Select
        style={{
          height: '40px',
          marginTop: '-1px',
          background: '#fff',
          width: '200px'
        }}
        {...props}
        key={`selected-${index}`}
      />
    )) || []),
    ...(filters?.dropdownCheckbox?.map((props, index) => (
      <DropdownCheckbox
        className="w-full md:w-auto"
        {...props}
        key={`dropdown-checkbox-${index}`}
      />
    )) || []),
    ...(filters?.dropdownRadio?.map((props, index) => (
      <DropdownRadio
        className="w-full md:w-auto"
        {...props}
        key={`dropdown-radio-${index}`}
      />
    )) || []),
    ...(filters?.dropdownRange?.map((props, index) => (
      <DropdownRange
        {...props}
        key={`dropdown-range-${index}`}
        className="w-full md:w-auto"
      />
    )) || []),
    ...(filters?.dropdownRangeSlider?.map((props, index) => (
      <DropdownRangeSlider
        {...props}
        key={`dropdown-range-slider-${index}`}
        className="w-full md:w-auto"
      />
    )) || [])
  ].slice(0, 4)

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

  const hasFilterBar =
    (search || results || viewToggle || arrowSelector || filters) &&
    !hiddenFilterBar

  return (
    <div role={role}>
      <TopPage {...(otherProps as TopPageProps)} />
      <div className="px-5">
        <div className="my-4">
          {hasFilterBar && (
            <FilterBar className="flex-wrap">
              {search && (
                <FilterBar.Section
                  className={smallSearch ? 'w-12 xl:w-60' : 'w-full sm:w-60'}
                >
                  <FilterSearch {...search} smallSearch={smallSearch} />
                </FilterBar.Section>
              )}
              {results && (
                <FilterBar.Section
                  className="ml-4 gap-2 flex justify-center -pr-6 w-full sm:w-auto"
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
                <FilterBar.Section className="flex justify-start items-center gap-2 flex-wrap w-full md:w-auto">
                  {filterComponents}
                </FilterBar.Section>
              )}
              <div className="flex-grow" />
              {clearFilters && (
                <FilterBar.Section className="w-full md:w-auto justify-center md:border-l-2 md:pl-4 ">
                  <Button
                    className="hover:bg-blue-600 rounded-lg group transition-colors duration-500"
                    variant="ghost"
                    onClick={clearFilters.onClick}
                  >
                    <Text
                      className="text-gray-400 group-hover:text-white transition-colors duration-500"
                      size="xs"
                    >
                      {clearFilters.label}
                    </Text>
                  </Button>
                </FilterBar.Section>
              )}
              {callToAction && (
                <FilterBar.Section>
                  <Button
                    variant="secondary"
                    onClick={callToAction.onClick}
                    className="whitespace-nowrap w-36 flex justify-center ml-4"
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
            </FilterBar>
          )}
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

PageTemplate.displayName = 'PageTemplate'

export default PageTemplate
