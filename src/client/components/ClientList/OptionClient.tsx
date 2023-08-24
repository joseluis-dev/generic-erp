import React from 'react'

interface OptionClientPropsType {
  client: any
  index: number
  setValue: any
  unitState: any
  setUnitState: any
}

const OptionClient = ({ client, index, setValue, unitState, setUnitState }: OptionClientPropsType): JSX.Element => {
  return (
    <li
      key={client.id}
      onClick={() => {
        unitState[index].selected = client.fullName
        const newUnitState = structuredClone(unitState)
        setUnitState(newUnitState)
        setValue('client', client.id)
      }}
    >
      <div>{client.fullName}</div>
      <div>{client.idNumber}</div>
      <div>{client.email}</div>
      <div>{client.address}</div>
    </li>
  )
}

export default OptionClient
