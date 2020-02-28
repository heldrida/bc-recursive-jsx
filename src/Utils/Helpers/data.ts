import sections from '../../../data/sections.json'
import states from '../../../data/states.json'
import questions_list_1 from '../../../data/44,45,46.json'
import questions_list_2 from '../../../data/4,5,6,7,8,11,12,15,16,17.json'
import { ISection, TLookUpMap, TCreateParentChildLookupMapCallback, ICustomSectionProps, IPairedQuestionAsnwer } from '../Types'
import { NS_SECTION_PARENT } from '../Constants'

const getSections = () => sections
const getStates = () => states
const getQuestions = () => [...questions_list_1, ...questions_list_2]

const questions = getQuestions()

const sortSectionsById = (): ISection[] => {
  const sortedSections = [...sections].sort((a, b) => a.id < b.id ? -1 : 1)
  return sortedSections
}

const idHandler = (id: number): number => (id > -1 && id) || Math.abs(id * NS_SECTION_PARENT)

const findRootSection = (): ISection => {
  const sortedSections = sortSectionsById()
  const topMostParent = sortedSections[0]
  return topMostParent
}

const setCustomSectionProperties = (section: ISection): ICustomSectionProps[] => {
  const flattendedExpandedStates = flattenedExpandedState()
  const pairedQuestionAsnwer = getQuestions()

  const list = pairedQuestionAsnwer.reduce((list: ICustomSectionProps[], item: IPairedQuestionAsnwer): ICustomSectionProps[] => {
    if (item.sectionId === section.id) {
      list = [
        ...list,
        {
          ...item,
          collapsed: !flattendedExpandedStates.includes(item.tocId)
        }
      ]
    }
    return list
  }, ([] as ICustomSectionProps[]))

  return list
}

const flattenedExpandedState = () => {
  const states = getStates()
  const flattened = states.reduce((acc: string[], curr) => {
    acc = [
      ...acc,
      ...curr.expanded
    ]
    return acc
  }, [])
  return flattened
}

const createHierarchicalList = (sections: ISection[]) => {
  const handler = (sections: ISection[], section: ISection, acc: {}) => {
    const childNodes = sections.filter(item => item.parentId === section.id)
    if (childNodes && Array.isArray(childNodes) && childNodes.length > 0) {
      acc = {
        ...section,
        childNodes: childNodes.map(node => {
          return childNodes && handler(sections, node, {})
        })
      }
    } else {
      acc = {
        ...section,
        childNodes: false
      }
    }

    const questionAnswer = questions.filter(question => question.sectionId === section.id)
    if (questionAnswer && questionAnswer.length > 0) {
      acc = {
        ...acc,
        questionAnswer: setCustomSectionProperties(section)
      }
    }

    return acc
  }

  const topMostParentSection = findRootSection()
  const hierarchicalList = handler(sections, topMostParentSection, {})

  return hierarchicalList
}

export {
  getSections,
  getStates,
  getQuestions,
  findRootSection,
  flattenedExpandedState,
  idHandler,
  setCustomSectionProperties,
  createHierarchicalList
}
