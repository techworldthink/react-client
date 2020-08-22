import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { TocAst } from '../../../../external-types/markdown-it-toc-done-right/interface'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { TableOfContents } from '../../table-of-contents/table-of-contents'
import './markdown-toc-button.scss'

export interface MarkdownTocButtonProps {
  tocAst: TocAst
}
export const MarkdownTocButton: React.FC<MarkdownTocButtonProps> = ({ tocAst }) => {
  return (
    <div className={'markdown-toc-button'}>
      <Dropdown drop={'up'}>
        <Dropdown.Toggle id="toc-overlay-button" variant={'secondary'} className={'no-arrow'}>
          <ForkAwesomeIcon icon={'bars'}/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className={'p-2'}>
            <TableOfContents ast={tocAst}/>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
