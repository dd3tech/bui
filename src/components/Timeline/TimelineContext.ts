import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface IContext {
  position: 'left' | 'right' | 'alternate'
  left: boolean
  setLeft: Dispatch<SetStateAction<boolean>>
}

const TimelineContext = createContext<IContext>({} as IContext)

export const TimelineProvider = TimelineContext.Provider
export const useTimelineContext = () => useContext(TimelineContext)
