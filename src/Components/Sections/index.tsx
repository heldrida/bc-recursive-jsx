import React, { useState, useEffect } from 'react'
import { getSections, createHierarchicalList } from '../../Utils/Helpers/data'
import SectionItem from '../SectionItem'


const Sections = () => {
  const [hierarchicalList, setHierarchicalList] = useState<{[prop: string]: any} | undefined>(undefined)

  useEffect(() => {
    const sections = getSections()
    const hierarchicalList = createHierarchicalList(sections)
    hierarchicalList && setHierarchicalList(hierarchicalList)
  }, [])

  return (
    <div>
      {
        hierarchicalList &&
        hierarchicalList.hasOwnProperty('childNodes') &&
        <SectionItem list={hierarchicalList} />
      }
    </div>
  )
}

export default Sections