import sections from '../../../data/sections.json'
import states from '../../../data/states.json'
import questions_list_1 from '../../../data/44,45,46.json'
import questions_list_2 from '../../../data/4,5,6,7,8,11,12,15,16,17.json'
import { findRootSection, createParentChildLookupMap } from '../Helpers/data'

describe('The data files', () => {
  it('should load all data files', () => {
    const dataFiles = [sections, states, questions_list_1, questions_list_2]
    expect(dataFiles.length).toBe(4)
    dataFiles.forEach(filename => expect(filename.length).toBeTruthy())
  })

  it('should find the top most parent section', () => {
    const section = findRootSection()
    const expectedTitle = 'chapters'
    expect(section.title.toLowerCase()).toEqual(expectedTitle)
  })

  it('should map the sections by hierarchy to minimize number of computations per request', () => {
    const lookupMap = createParentChildLookupMap()
    const expected = [{
      parent: -1,
      children: [1, 41]
    },
    {
      parent: 4,
      children: [5, 6]
    },
    {
      parent: 44,
      children: [45, 46]
    }]
    expected.forEach(item => expect(lookupMap.get(item.parent)).toEqual(item.children))
  })
})