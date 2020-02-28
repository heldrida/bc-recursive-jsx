import React, { useEffect, useState } from 'react'
import { getSections, createHierarchicalList } from './Utils/Helpers/data'
import sanitizeHtml from 'sanitize-html'

const QuestionContainer = ({question, answer, collapsed}:{question: string, answer: string, collapsed: boolean}): any => {
  const [showAnswer, setShowAnswer] = useState<boolean>(!collapsed)

  const ctaHandler = () => setShowAnswer(!showAnswer)

  return (
    <div>
      <div data-name='question' dangerouslySetInnerHTML={{__html: sanitizeHtml(question)}} />
      {
        showAnswer && <div data-name='answer' dangerouslySetInnerHTML={{__html: sanitizeHtml(answer)}} />
      }
      <button onClick={ctaHandler}>{`${showAnswer ? 'collapse' : 'expand'}`}</button>
    </div>
  )
}

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
           nestedList.questionAnswer.map((item: any, key: number) => item.question && item.answer && <QuestionContainer key={key} question={item.question} answer={item.answer} collapsed={item.collapsed} />)
          }
        </div>
      )}
    </div>
  )
}

const Sections = () => {
  const [hierarchicalList, setHierarchicalList] = useState<{[prop: string]: any} | undefined>(undefined)

  useEffect(() => {
    const sections = getSections()
    const hierarchicalList = createHierarchicalList(sections)
    hierarchicalList && setHierarchicalList(hierarchicalList)
    console.log('hierarchicalList: ', hierarchicalList)
  }, [])

  return (
    <div>
      {
        hierarchicalList &&
        hierarchicalList.hasOwnProperty('childNodes') &&
        <SectionItem list={hierarchicalList} />
      }
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Sections />
    </div>
  )
}

export default App