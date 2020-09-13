import React from 'react'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../show-if/show-if'
import './user-avatar.scss'

export interface UserAvatarProps {
    name: string;
    photo: string;
    additionalClasses?: string;
    showName?: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, photo, additionalClasses = '', showName = true }) => {
  const { t } = useTranslation()

  return (
    <span className={'d-inline-flex align-items-center ' + additionalClasses}>
      <img
        src={photo}
        className="user-avatar rounded mr-1"
        alt={t('common.avatarOf', { name })}
        title={name}
      />
      <ShowIf condition={showName}>
        <span className="mx-1">{name}</span>
      </ShowIf>
    </span>
  )
}

export { UserAvatar }
