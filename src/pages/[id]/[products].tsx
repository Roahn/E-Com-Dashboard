import React from 'react'

interface Props {
  name: string
}
const Products: React.FC<Props> = ({ name }) => {
  return (
    <div>Products {name}</div>
  )
}
export default Products