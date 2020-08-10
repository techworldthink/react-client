import React, { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Branding } from '../../../common/branding/branding'
import { CoverButtons } from './cover-buttons/cover-buttons'
import banner from './banner.svg'

const Intro: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <div className={'d-inline-flex h-100 align-items-center justify-content-center'}>
        <div className={''}>
          <img src={banner} style={{ maxWidth: '800px', width: '100%' }} alt={'Banner'}/>
          <p className="lead mb-2">
            <Trans i18nKey="app.slogan"/>
          </p>
          <div>
            <Branding/>
          </div>
        </div>
      </div>

      <CoverButtons/>
    </Fragment>
  )
}

export { Intro }
