import sections from '../../../data/sections.json'
import states from '../../../data/states.json'
import questions_list_1 from '../../../data/44,45,46.json'
import questions_list_2 from '../../../data/4,5,6,7,8,11,12,15,16,17.json'
import { ISection, TLookUpMap, TCreateParentChildLookupMapCallback } from '../Types'
import { NS_SECTION_PARENT } from '../Constants'

const getSections = () => sections
const getStates = () => states
const getQuestions = () => [...questions_list_1, ...questions_list_2]

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

const sectionCallbackHandler = (section: ISection, cb: TCreateParentChildLookupMapCallback) => typeof cb === 'function' ? cb(section) : idHandler(section.id)

const createParentChildLookupMap = (cb?: TCreateParentChildLookupMapCallback): TLookUpMap => {
  const lookupMap = new Map()
  sections.forEach(section => {
    const parentMappedChilds = lookupMap.get(idHandler(section.parentId))
    if (!parentMappedChilds) {
      lookupMap.set(idHandler(section.parentId), [sectionCallbackHandler(section, cb)])
    } else {
      lookupMap.set(idHandler(section.parentId), [...parentMappedChilds, sectionCallbackHandler(section, cb)])
    }
  })
  return lookupMap
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

export {
  getSections,
  getStates,
  getQuestions,
  findRootSection,
  createParentChildLookupMap,
  flattenedExpandedState,
  idHandler
}
