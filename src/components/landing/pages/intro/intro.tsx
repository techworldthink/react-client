import React, { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Branding } from '../../../common/branding/branding'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { CoverButtons } from './cover-buttons/cover-buttons'
import { FeatureLinks } from './feature-links'
import screenshot from './img/screenshot.png'

const Intro: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <div className={'d-inline-flex h-100 align-items-center justify-content-center'}>
        <div className={''}>
          <img src={'/hedge.svg'} style={{ maxWidth: '800px', width: '100%' }}/>
          <div>
            <Branding/>
          </div>
          <p className="lead mb-5">
            <Trans i18nKey="app.slogan"/>
          </p>
        </div>
      </div>

      <CoverButtons/>
    </Fragment>
  )
}

export { Intro }
