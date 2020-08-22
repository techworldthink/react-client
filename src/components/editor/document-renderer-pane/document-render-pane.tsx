import React, { useCallback, useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { TocAst } from '../../../external-types/markdown-it-toc-done-right/interface'
import { LineMarkerPosition, MarkdownRenderer } from '../../markdown-renderer/markdown-renderer'
import { ScrollProps, ScrollState } from '../scroll/scroll-props'
import { findLineMarks } from '../scroll/utils'
import { YAMLMetaData } from '../yaml-metadata/yaml-metadata'
import { DocumentExternalToc, ExternalTocViewMode } from './document-external-toc'

interface DocumentRenderPaneProps {
  content: string
  onMetadataChange: (metaData: YAMLMetaData | undefined) => void
  onFirstHeadingChange: (firstHeading: string | undefined) => void
  wide?: boolean
}

export const DocumentRenderPane: React.FC<DocumentRenderPaneProps & ScrollProps> = ({ content, onMetadataChange, onFirstHeadingChange, wide, scrollState, onScroll, onMakeScrollSource }) => {
  const [tocAst, setTocAst] = useState<TocAst>()
  const renderer = useRef<HTMLDivElement>(null)
  const { width } = useResizeObserver({ ref: renderer })
  const lastScrollPosition = useRef<number>()
  const [lineMarks, setLineMarks] = useState<LineMarkerPosition[]>()

  const realWidth = width || 0

  useEffect(() => {
    if (!renderer.current || !lineMarks || !scrollState) {
      return
    }
    const { lastMarkBefore, firstMarkAfter } = findLineMarks(lineMarks, scrollState.firstLineInView)
    const positionBefore = lastMarkBefore ? lastMarkBefore.position : 0
    const positionAfter = firstMarkAfter ? firstMarkAfter.position : renderer.current.offsetHeight
    const lastMarkBeforeLine = lastMarkBefore ? lastMarkBefore.line : 1
    const firstMarkAfterLine = firstMarkAfter ? firstMarkAfter.line : content.split('\n').length
    const lineCount = firstMarkAfterLine - lastMarkBeforeLine
    const blockHeight = positionAfter - positionBefore
    const lineHeight = blockHeight / lineCount
    const position = positionBefore + (scrollState.firstLineInView - lastMarkBeforeLine) * lineHeight + scrollState.scrolledPercentage / 100 * lineHeight
    const correctedPosition = Math.floor(position)
    if (correctedPosition !== lastScrollPosition.current) {
      lastScrollPosition.current = correctedPosition
      renderer.current.scrollTo({
        top: correctedPosition
      })
    }
  }, [content, lineMarks, scrollState])

  const userScroll = useCallback(() => {
    if (!renderer.current || !lineMarks || !onScroll) {
      return
    }
    const resyncedScroll = Math.ceil(renderer.current.scrollTop) === lastScrollPosition.current
    if (resyncedScroll) {
      return
    }

    const scrollTop = renderer.current.scrollTop

    const beforeLineMark = lineMarks
      .filter(lineMark => lineMark.position <= scrollTop)
      .reduce((prevLineMark, currentLineMark) =>
        prevLineMark.line >= currentLineMark.line ? prevLineMark : currentLineMark)

    const afterLineMark = lineMarks
      .filter(lineMark => lineMark.position > scrollTop)
      .reduce((prevLineMark, currentLineMark) =>
        prevLineMark.line < currentLineMark.line ? prevLineMark : currentLineMark)

    const blockHeight = afterLineMark.position - beforeLineMark.position
    const distanceToBefore = scrollTop - beforeLineMark.position
    const percentageRaw = (distanceToBefore / blockHeight)
    const percentage = Math.floor(percentageRaw * 100)
    const newScrollState: ScrollState = { firstLineInView: beforeLineMark.line, scrolledPercentage: percentage }
    onScroll(newScrollState)
  }, [lineMarks, onScroll])

  return (
    <div className={'bg-light flex-fill pb-5 flex-row d-flex w-100 h-100 overflow-y-scroll'}
      ref={renderer} onScroll={userScroll} onMouseEnter={onMakeScrollSource} >
      <div className={'col-md'}/>
      <MarkdownRenderer
        className={'flex-fill'}
        content={content}
        wide={wide}
        onTocChange={(tocAst) => setTocAst(tocAst)}
        onMetaDataChange={onMetadataChange}
        onFirstHeadingChange={onFirstHeadingChange}
        onLineMarkerPositionChanged={setLineMarks}
      />

      <div className={'col-md'}>
        <DocumentExternalToc tocAst={tocAst} viewMode={realWidth >= 1280 ? ExternalTocViewMode.SIDEBAR : ExternalTocViewMode.BUTTON}/>
      </div>
    </div>
  )
}
