import { useShow } from '@pankod/refine-core';
import React from 'react'

export default function productsShow() {
    const { queryResult } = useShow();
    console.log(queryResult);
  return (
    <div>productsShow</div>
  )
}
