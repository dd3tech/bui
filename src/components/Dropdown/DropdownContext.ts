/*
 * Copyright (c) DD360 and its affiliates.
 */

import React from 'react'

interface IContext {
  disableAnimation?: boolean
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = React.createContext<IContext>({} as IContext)

export const DropdownProvider = DropdownContext.Provider
export const useDropdownContext = () => React.useContext(DropdownContext)
