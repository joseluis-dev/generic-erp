import React from 'react'

interface OptionProviderPropsType {
  provider: any
  index: number
  setValue: any
  unitState: any
  setUnitState: any
}

const OptionProvider = ({ provider, index, setValue, unitState, setUnitState }: OptionProviderPropsType): JSX.Element => {
  return (
    <li
      key={provider.id}
      onClick={() => {
        unitState[index].selected = provider.name
        const newUnitState = structuredClone(unitState)
        setUnitState(newUnitState)
        setValue('provider', provider.id)
      }}
    >
      <div>{provider.name}</div>
      <div>{provider.ruc}</div>
      <div>{provider.email}</div>
      <div>{provider.telephone}</div>
    </li>
  )
}

export default OptionProvider
