import React from 'react'
import QuestionContainer from '../QuestionContainer'

const SectionItem = ({list}: {list: any}) => {
  return (
    <div>
      <h3>{list && list.title}</h3>
      {list.childNodes.map((nestedList: any, key: number) =>
        <div key={key}>
          <span>{nestedList.title}</span>
          {nestedList.childNodes && <SectionItem list={nestedList}/>}
          {
           nestedList.questionAnswer &&
           nestedList.questionAnswer.map((item: any, key: number) =>
            item.question &&
            item.answer &&
            <QuestionContainer key={key} question={item.question} answer={item.answer} collapsed={item.collapsed} />)
          }
        </div>
      )}
    </div>
  )
}

export default SectionItem