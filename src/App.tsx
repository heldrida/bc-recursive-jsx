import React, { useEffect, useState } from 'react'
import { findRootSection, createParentChildLookupMap } from './Utils/Helpers/data'
import { ISection } from './Utils/Types'

const Sections = () => {
  const [rootSection, setRootSection] = useState<ISection | undefined>(undefined)
  const [lookupMap, setLookupMap] = useState()

  useEffect(() => {
    const rootSection = findRootSection()
    const lookupMap = createParentChildLookupMap()
    rootSection && setRootSection(rootSection)
    lookupMap && setLookupMap(lookupMap)
  }, [])

  return (
    <div>
      <h1>{rootSection && rootSection.title}</h1>
      {
        lookupMap &&
        lookupMap.forEach((item: any) => console.log('item: ', item))
      }
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Sections />
    </div>
  )
}

export default App