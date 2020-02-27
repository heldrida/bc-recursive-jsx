import { findRootSection, createParentChildLookupMap, getSections, getStates, getQuestions, flattenedExpandedState, idHandler } from '../Helpers/data'

describe('The data files', () => {
  it('should load all data files', () => {
    const dataFiles = [getSections(), getStates(), getQuestions()]
    expect(dataFiles.length).toBe(3)
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
      parent: idHandler(-1),
      children: [1, 41]
    },
    {
      parent: idHandler(4),
      children: [5, 6]
    },
    {
      parent: idHandler(44),
      children: [45, 46]
    }]
    expected.forEach(item => expect(lookupMap.get(idHandler(item.parent))).toEqual(item.children))
  })

  it('should the lookup map, accept a callback for further computation if required', () => {
    const mockPrefix = 'child is'
    const lookupMap = createParentChildLookupMap((section) => `${mockPrefix} ${section.id}`)
    const expected = [{
      parent: idHandler(-1),
      children: [`${mockPrefix} ${1}`, `${mockPrefix} ${41}`]
    }]
    expected.forEach(item => expect(lookupMap.get(idHandler(item.parent))).toEqual(item.children))
  })

  it('should map all the expanded state', () => {
    const expected = ['1433932431217_Toc411861208', '1433932431217_Toc411861211',
                      '1433932431217_Toc411861208', '1433932431217_Toc411861217',
                      '1433932431217_Toc411861217', '1433932435017_Toc402171630',
                      '1433932435017_Toc402171633']
    expect(flattenedExpandedState()).toEqual(expected)
  })
})