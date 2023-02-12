import React from 'react'

type PCard = {
  p_name? :String,
  p_cost? :Number,
  p_id? : Number ,
  p_details : String
}
const ProductCard = ({p_name , p_cost , p_id , p_details } : PCard) => {
  return (
    <div> {p_name} </div>
  )
}

export default ProductCard;
