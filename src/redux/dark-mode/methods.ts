import { store } from '..'
import { DarkModeConfigActionType, SetDarkModeConfigAction } from './types'

export const setDarkMode = (darkMode: boolean): void => {
  const action: SetDarkModeConfigAction = {
    type: DarkModeConfigActionType.SET_DARK_MODE,
    darkMode: darkMode
  }
  store.dispatch(action)
}
