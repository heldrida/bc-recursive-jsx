import { 
  findRootSection,
  getSections,
  getStates,
  getQuestions,
  flattenedExpandedState,
  setCustomSectionProperties,
  createHierarchicalList } from '../Helpers/data'
import hierarchicalListMock from '../Mocks/hierarchicalList.json'

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

  it('should have a callback that manipulates the section properties to our desired output', () => {
    const sections = getSections()
    ;[5, 16, 45].forEach((id: number) => {
      const section = sections.find(item => item.id === id)
      const computedSection = section && setCustomSectionProperties(section)
      computedSection && expect(computedSection[0]).toHaveProperty('collapsed', id !== 5)
    })
  })

  it('should map all the expanded state', () => {
    const expected = ['1433932431217_Toc411861208', '1433932431217_Toc411861211',
                      '1433932431217_Toc411861208', '1433932431217_Toc411861217',
                      '1433932431217_Toc411861217', '1433932435017_Toc402171630',
                      '1433932435017_Toc402171633']
    expect(flattenedExpandedState()).toEqual(expected)
  })

  it('should create hierarchical list', () => {
    const sections = getSections()
    const hierarchicalList = createHierarchicalList(sections)
    expect(hierarchicalList).toEqual(hierarchicalListMock)
  })
})