interface ISection {
  id: number;
  title: string;
  parentId: number;
}

interface IState {
  expanded?: (string)[] | null;
}

interface IPairedQuestionAsnwer {
  qa_id: number;
  question: string;
  answer: string;
  sectionId: number;
  questionNumber: number;
  tocId: string;
  previousTocId: string;
  nextTocId: string;
}

type TLookUpMap = Map<number, []>

type TCreateParentChildLookupMapCallback = ((section: any) => string) | undefined

export {
  ISection,
  IState,
  IPairedQuestionAsnwer,
  TLookUpMap,
  TCreateParentChildLookupMapCallback
}