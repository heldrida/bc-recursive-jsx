import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'

const QuestionContainer = ({question, answer, collapsed}:{question: string, answer: string, collapsed: boolean}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(!collapsed)

  const ctaHandler = () => setShowAnswer(!showAnswer)

  return (
    <div>
      <h4 data-name='question' dangerouslySetInnerHTML={{__html: sanitizeHtml(question)}} />
      {
        showAnswer && <div data-name='answer' dangerouslySetInnerHTML={{__html: sanitizeHtml(answer)}} />
      }
      <button onClick={ctaHandler}>{`${showAnswer ? 'collapse' : 'expand'}`}</button>
    </div>
  )
}

export default QuestionContainer