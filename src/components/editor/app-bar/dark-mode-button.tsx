import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'
import { setDarkMode } from '../../../redux/dark-mode/methods'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'

const DarkModeButton: React.FC = () => {
  const { t } = useTranslation()
  const darkModeEnabled = useSelector((state: ApplicationState) => state.darkMode.darkMode)

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkModeEnabled)
  }, [darkModeEnabled])

  return (
    <ToggleButtonGroup type="checkbox" defaultValue={[]} name="dark-mode" className="ml-2" value={darkModeEnabled ? ['dark'] : ['']}>
      <ToggleButton
        title={ darkModeEnabled ? t('editor.darkMode.switchToLight') : t('editor.darkMode.switchToDark')}
        variant={ darkModeEnabled ? 'secondary' : 'light' }
        className={ darkModeEnabled ? 'text-light' : 'text-secondary' }
        onChange={toggleDarkMode} value={'dark'}
      >
        {darkModeEnabled
          ? <ForkAwesomeIcon icon="sun"/>
          : <ForkAwesomeIcon icon="moon"/>
        }
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export { DarkModeButton }
