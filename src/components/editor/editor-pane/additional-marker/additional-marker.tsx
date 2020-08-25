import { Editor } from 'codemirror'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useTimeoutFn } from 'react-use'
import './additional-marker.scss'

export interface AdditionalMarkerProps {
  editor: Editor,
  position: CodeMirror.Position
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
  const [show, setShow] = useState(false)

  const [, , reset] = useTimeoutFn(() => {
    setShow(false)
  }, 5000)

  useEffect(() => {
    setShow(true)
    reset()
  }, [position, reset])

  const innerMark = <Fragment>
    &#65279;
    <span className={'cursor'} style={{ borderColor: `#${color}` }}/>
    <span className={`nametag ${show ? 'show' : ''}`} style={{ backgroundColor: `#${color}` }}>{name}</span>
    &#65279;
  </Fragment>

  return ReactDOM.createPortal(innerMark, marker)
}
