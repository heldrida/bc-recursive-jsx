interface ISections {
  id: number;
  title: string;
  parentId: number;
}

interface IStates {
  expanded?: (string)[] | null;
}

export interface IPairedQuestionAsnwers {
  qa_id: number;
  question: string;
  answer: string;
  sectionId: number;
  questionNumber: number;
  tocId: string;
  previousTocId: string;
  nextTocId: string;
}


export {
  ISections,
  IStates,
  IPairedQuestionAsnwers
}