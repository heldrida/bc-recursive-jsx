interface ISection {
  id: number;
  title: string;
  parentId: number;
  childNodes?: ISection[]
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

interface ICustomSectionProps extends IPairedQuestionAsnwer {
  collapsed: boolean
}

type TLookUpMap = Map<number, IPairedQuestionAsnwer[]>

type TCreateParentChildLookupMapCallback = (section: any) => ICustomSectionProps[] | string

interface IChildNodesEntity {
  id: number;
  title: string;
  parentId: number;
  childNodes: (IChildNodesEntity)[];
  questionAnswer?: (IQuestionAnswerEntity)[];
}

interface IQuestionAnswerEntity {
  qa_id: number;
  question: string;
  answer: string;
  sectionId: number;
  questionNumber: number;
  tocId: string;
  previousTocId: string;
  nextTocId: string;
  collapsed: boolean;
}


export {
  ISection,
  IState,
  IPairedQuestionAsnwer,
  TLookUpMap,
  TCreateParentChildLookupMapCallback,
  ICustomSectionProps,
  IChildNodesEntity,
  IQuestionAnswerEntity
}