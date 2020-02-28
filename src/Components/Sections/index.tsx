import React, { useState, useEffect } from 'react'
import { getSections, createHierarchicalList } from '../../Utils/Helpers/data'
import SectionItem from '../SectionItem'
import { SectionContainer } from './styled'

const Sections = () => {
  const [hierarchicalList, setHierarchicalList] = useState<{[prop: string]: any} | undefined>(undefined)

  useEffect(() => {
    const sections = getSections()
    const hierarchicalList = createHierarchicalList(sections)
    hierarchicalList && setHierarchicalList(hierarchicalList)
  }, [])

  return (
    <SectionContainer>
      {
        hierarchicalList &&
        hierarchicalList.hasOwnProperty('childNodes') &&
        <SectionItem list={hierarchicalList} />
      }
    </SectionContainer>
  )
}

export default Sections