import React from 'react'

export default function Products() {
    var path= window.location.pathname.split('/');
  const p_name = path[3];
  return (
    <div>products {p_name}</div>
  )
}

