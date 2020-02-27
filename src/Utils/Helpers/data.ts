import sections from '../../../data/sections.json'
import states from '../../../data/states.json'
import questions_list_1 from '../../../data/44,45,46.json'
import questions_list_2 from '../../../data/4,5,6,7,8,11,12,15,16,17.json'
import { ISection } from '../Types'


const getSections = () => sections
const getStates = () => states
const getQuestions = () => [...questions_list_1, ...questions_list_2]

const sortSectionsById = (): ISection[] => {
  const sortedSections = [...sections].sort((a, b) => a.id < b.id ? -1 : 1)
  return sortedSections
}

const findRootSection = (): ISection => {
  const sortedSections = sortSectionsById()
  const topMostParent = sortedSections[0]
  return topMostParent
}

const createParentChildLookupMap = () => {
  const lookupMap = new Map()
  sections.forEach(section => {
    const parentMappedChilds = lookupMap.get(section.parentId)
    if (!parentMappedChilds) {
      lookupMap.set(section.parentId, [section.id])
    } else {
      lookupMap.set(section.parentId, [...parentMappedChilds, section.id])
    }
  })
  return lookupMap
}

export {
  getSections,
  getStates,
  getQuestions,
  findRootSection,
  createParentChildLookupMap
}
