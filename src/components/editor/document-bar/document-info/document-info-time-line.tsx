import { Moment } from 'moment'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconName } from '../../../common/fork-awesome/types'
import { DocumentInfoLine } from './document-info-line'
import { TimeFromNow } from './time-from-now'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'

export interface DocumentInfoLineWithTimeProps {
  size?: '2x' | '3x' | '4x' | '5x' | undefined
  time: Moment,
  mode: DocumentInfoLineWithTimeMode
  userName: string
  profileImageSrc: string
}

export enum DocumentInfoLineWithTimeMode {
  CREATED,
  EDITED
}

export const DocumentInfoTimeLine: React.FC<DocumentInfoLineWithTimeProps> = ({ time, mode, userName, profileImageSrc, size }) => {
  useTranslation()

  const i18nKey = mode === DocumentInfoLineWithTimeMode.CREATED ? 'editor.modal.documentInfo.created' : 'editor.modal.documentInfo.edited'
  const icon: IconName = mode === DocumentInfoLineWithTimeMode.CREATED ? 'plus' : 'pencil'

  return (
    <DocumentInfoLine icon={icon} size={size}>
      <Trans i18nKey={i18nKey} >
        <UserAvatar photo={profileImageSrc} additionalClasses={`font-style-normal bold font-weight-bold ${size ? 'document-info-avatar' : ''}`} name={userName} size={size ? 'lg' : undefined}/>
        <TimeFromNow time={time}/>
      </Trans>
    </DocumentInfoLine>
  )
}
