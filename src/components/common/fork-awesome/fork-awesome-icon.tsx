import 'fork-awesome/css/fork-awesome.min.css'
import React from 'react'
import { IconName, IconSize } from './types'

export interface ForkAwesomeIconProps {
  icon: IconName
  className?: string
  fixedWidth?: boolean
  size?: IconSize
  stacked?: boolean
}

export const ForkAwesomeIcon: React.FC<ForkAwesomeIconProps> = ({ icon, fixedWidth = false, size, className, stacked = false }) => {
  const fixedWithClass = fixedWidth ? 'fa-fw' : ''
  const sizeClass = size ? `-${size}` : (stacked ? '-1x' : '')
  const stackClass = stacked ? '-stack' : ''
  const extraClasses = `${className ?? ''} ${sizeClass || stackClass ? `fa${stackClass}${sizeClass}` : ''}`
  return (
    <i className={`fa ${fixedWithClass} fa-${icon} ${extraClasses}`}/>
  )
}
