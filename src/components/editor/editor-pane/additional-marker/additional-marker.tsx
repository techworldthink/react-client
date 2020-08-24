import { Editor } from 'codemirror'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './additional-marker.scss'

export interface AdditionalMarkerProps {
  editor: Editor,
  position:CodeMirror.Position
  name: string
  color: string
}

export const AdditionalMarker: React.FC<AdditionalMarkerProps> = ({ editor, position, name, color }) => {
  const [marker] = useState<HTMLElement>(() => {
    const marker = document.createElement('span')
    marker.classList.add('additional-marker')
    return marker
  })
  useEffect(() => {
    editor.setBookmark(position, { widget: marker })
    return () => marker.remove()
  }, [editor, marker, position])

  const innerMark = <Fragment>
    <span className={'cursor'} style={{ borderColor: `#${color}` }}/>
    <span className={'nametag'} style={{ backgroundColor: `#${color}` }}>{name}</span>
  </Fragment>

  return ReactDOM.createPortal(innerMark, marker)
}
