import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { updateDisplayName } from '../../../../../api/me'
import { ApplicationState } from '../../../../../redux'
import { getAndSetUser } from '../../../../../utils/apiUtils'
import { ShowIf } from '../../../../common/show-if/show-if'

export const ProfileDisplayName: React.FC = () => {
  const regexInvalidDisplayName = /^\s*$/
  // eslint-disable-next-line no-control-regex
  const regexEmailAddress = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  const { t } = useTranslation()
  const user = useSelector((state: ApplicationState) => state.user)
  const [submittable, setSubmittable] = useState(false)
  const [error, setError] = useState(false)
  const [displayName, setDisplayName] = useState(user?.name || '')
  const [emailAddress, setEmailAddress] = useState('')

  useEffect(() => {
    const displayNameValid = !regexInvalidDisplayName.test(displayName)
    const emailAddressValid = emailAddress === '' || regexEmailAddress.test(emailAddress)
    setSubmittable(displayNameValid && emailAddressValid)
  }, [displayName, emailAddress])

  const doAsyncChange = async () => {
    await updateDisplayName(displayName)
    await getAndSetUser()
  }

  const profileSubmit = (event: FormEvent) => {
    doAsyncChange().catch(() => setError(true))
    event.preventDefault()
  }

  return (
    <Card className="bg-dark mb-4">
      <Card.Body>
        <Card.Title>
          <Trans i18nKey="profile.userProfile"/>
        </Card.Title>
        <ShowIf condition={!!user && !!user.photo}>
          <img src={user?.photo} alt='profile image' className='rounded w-25'/>
        </ShowIf>
        <Form onSubmit={profileSubmit} className="text-left">
          <Form.Group controlId="displayName">
            <Form.Label><Trans i18nKey="profile.displayName"/></Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder={t('profile.displayName')}
              value={displayName}
              className="bg-dark text-white"
              onChange={(event) => setDisplayName(event.target.value)}
              isInvalid={error}
              required
            />
            <Form.Text><Trans i18nKey="profile.displayNameInfo"/></Form.Text>
          </Form.Group>
          <Form.Group controlId='emailAddress'>
            <Form.Label><Trans i18nKey='profile.emailAddress'/></Form.Label>
            <Form.Control
              type='email'
              size='sm'
              placeholder={t('profile.emailAddress')}
              className='bg-dark text-white'
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <Form.Text><Trans i18nKey='profile.emailAddressInfo'/></Form.Text>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={!submittable}>
            <Trans i18nKey="common.save"/>
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
