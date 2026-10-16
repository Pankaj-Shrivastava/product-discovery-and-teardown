import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppState, StageNumber } from '../types'
import { AppAction, appReducer, initialState } from './reducer'

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  goToStage: (stage: StageNumber) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const goToStage = (stage: StageNumber) => {
    dispatch({ type: 'SET_STAGE', payload: stage })
  }

  return (
    <AppContext.Provider value={{ state, dispatch, goToStage }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
