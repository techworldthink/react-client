import { Editor } from 'codemirror'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './additional-marker.scss'

export interface AdditionalMarkerProps {
  editor: Editor,
  position:CodeMirror.Position
}

export const AdditionalMarker: React.FC<AdditionalMarkerProps> = ({ editor, position, children }) => {
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
    <span className={'cursor'}/>
    <span className={'nametag'}>wgiew</span>
  </Fragment>

  return ReactDOM.createPortal(innerMark, marker)
}
