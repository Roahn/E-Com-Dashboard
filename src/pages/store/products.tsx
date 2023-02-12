import React from 'react'
import { Add } from "@mui/icons-material";
import { GetServerSideProps } from "next";
import { useTable } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import { host } from 'utils/api';
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

import { ProductCard} from "components";

export default function Products() {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allProducts = data?.data ?? [];
  
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

  return (
    <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
    {allProducts?.map((data , id) => (
        <>
            <ProductCard key = {id}
            p_name = {data.product_name}
            p_cost = {data.product_cost}
            p_id = {data.prdt_id}
            p_details = {data.product_details}
            />

            <button>view product</button>
        </>
               
    ))}
</Box>
  )
}
