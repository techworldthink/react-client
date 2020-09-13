import { Moment } from 'moment'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconName } from '../../../common/fork-awesome/types'
import { DocumentInfoLine } from './document-info-line'
import './document-info-time-line.scss'
import { TimeFromNow } from './time-from-now'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'

export interface DocumentInfoLineWithTimeProps {
  isInline?: boolean
  time: Moment,
  mode: DocumentInfoLineWithTimeMode
  userName: string
  profileImageSrc: string
}

export enum DocumentInfoLineWithTimeMode {
  CREATED,
  EDITED
}

export const DocumentInfoTimeLine: React.FC<DocumentInfoLineWithTimeProps> = ({ time, mode, userName, profileImageSrc, isInline }) => {
  useTranslation()

  const i18nKey = mode === DocumentInfoLineWithTimeMode.CREATED ? 'editor.modal.documentInfo.created' : 'editor.modal.documentInfo.edited'
  const icon: IconName = mode === DocumentInfoLineWithTimeMode.CREATED ? 'plus' : 'pencil'

  return (
    <DocumentInfoLine icon={icon} isInline={isInline}>
      <Trans i18nKey={i18nKey} >
        <UserAvatar photo={profileImageSrc} additionalClasses={`font-style-normal bold font-weight-bold ${!isInline ? 'document-info-avatar' : ''}`} name={userName}/>
        <TimeFromNow time={time}/>
      </Trans>
    </DocumentInfoLine>
  )
}
