import React from 'react'
import { TocAst } from '../../../external-types/markdown-it-toc-done-right/interface'
import { TableOfContents } from '../table-of-contents/table-of-contents'
import { MarkdownTocButton } from './markdown-toc-button/markdown-toc-button'

export enum ExternalTocViewMode {
  SIDEBAR,
  BUTTON
}

export interface DocumentExternalTocProps {
  tocAst?: TocAst,
  viewMode: ExternalTocViewMode
}

export const DocumentExternalToc: React.FC<DocumentExternalTocProps> = ({ tocAst, viewMode }) => {
  if (!tocAst) {
    return null
  }

  switch (viewMode) {
    case ExternalTocViewMode.SIDEBAR:
      return <TableOfContents ast={tocAst} className={'position-fixed'}/>
    case ExternalTocViewMode.BUTTON:
      return <MarkdownTocButton tocAst={tocAst}/>
    default:
      return null
  }
}
