"use client"

import { Product } from "@prisma/client";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/uitls/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRememberMe, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";

interface ManageProductClientProps{
    products: Product[]
}

const ManageProductClient: React.FC<ManageProductClientProps> = ({products}) => {
    const paginationModel = { pageSize: 5, page: 0 };



    let rows: any = []
    if(products){
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: "ID", width: 220},
        {field: 'name', headerName: "Name", width: 220},
        {field: 'price', headerName: "Price(INR)", width: 100, renderCell:(params) => {
            return <div className="font-bold text-slate-800">{params.row.price}</div>
        }},
        {field: 'category', headerName: "Category", width: 220},
        {field: 'brand', headerName: "Brand", width: 100},
        {field: 'inStock', headerName: "InStock", width: 120, renderCell:(params) => {
            return <div>{params.row.inStock === true ? <Status text="in stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" /> : <Status text="out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />}</div>
        }},
        {field: 'action', headerName: "Actions", width: 200, renderCell:(params) => {
            return <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdCached} onClick={() => {}} />
                <ActionBtn icon={MdDelete} onClick={() => {}} />
                <ActionBtn icon={MdRemoveRedEye} onClick={() => {}} />
            </div>
        }}
    ]

    return ( 
        <div className="max-w-[1350px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Products" />
            </div>
            <div style={{height: 600, width: "100%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{ border: 0 }}
                />
            </div>
        </div>
    );
}
 
export default ManageProductClient;