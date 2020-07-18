import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans } from 'react-i18next'

export const ProfileApiTokens: React.FC = () => {
  return (
    <Card className="bg-dark mb-4">
      <Card.Body>
        <Card.Title>
          <Trans i18nKey="profile.apiTokens.title"/>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}
