import React from 'react'
import QuestionContainer from '../QuestionContainer'
import { SectionItemContainer} from './styled'
import { IChildNodesEntity } from '../../Utils/Types'

const SectionItem = ({list}: {list: IChildNodesEntity}) => {
  return (
    <SectionItemContainer>
      <h2>{list && list.title}</h2>
      {list && list.childNodes.map((nestedList: any, key: number) =>
        <div key={key}>
          {
           nestedList.questionAnswer &&
           nestedList.questionAnswer.map((item: any, key: number) =>
              item.question &&
              item.answer &&
              <QuestionContainer key={key} question={item.question} answer={item.answer} collapsed={item.collapsed} />)
          }
          {nestedList.childNodes && <SectionItem list={nestedList}/>}
        </div>
      )}
    </SectionItemContainer>
  )
}

export default SectionItem