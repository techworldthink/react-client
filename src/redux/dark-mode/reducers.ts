import { Reducer } from 'redux'
import { DarkModeConfig, DarkModeConfigActions, DarkModeConfigActionType, SetDarkModeConfigAction } from './types'

export const initialState: DarkModeConfig = {
  darkMode: false
}

export const DarkModeConfigReducer: Reducer<DarkModeConfig, DarkModeConfigActions> = (state: DarkModeConfig = initialState, action: DarkModeConfigActions) => {
  switch (action.type) {
    case DarkModeConfigActionType.SET_DARK_MODE:
      return {
        ...state,
        darkMode: (action as SetDarkModeConfigAction).darkMode
      }
    default:
      return state
  }
}
