"use client"

import { Order, User } from "@prisma/client";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/uitls/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";


interface ManageOrderClientProps{
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const ManageOrderClient: React.FC<ManageOrderClientProps> = ({orders}) => {
    const paginationModel = { pageSize: 5, page: 0 };

    const router = useRouter()


    let rows: any = []
    if(orders){
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: "ID", width: 220},
        {field: 'customer', headerName: "Customer", width: 130},
        {field: 'amount', headerName: "Amount(INR)", width: 130, renderCell:(params) => {
            return <div className="font-bold text-slate-800">{params.row.amount}</div>
        }},
        {field: 'paymentStatus', headerName: "Payment Status", width: 130, renderCell:(params) => {
            return <div>{params.row.paymentStatus === "pending" ? (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />) : params.row.paymentStatus === "complete" ? (<Status text="completed" icon={MdDeliveryDining} bg="bg-green-200" color="text-green-700" />) : <></>}</div>
        }},
        {field: 'deliveryStatus', headerName: "Delivery Status", width: 130, renderCell:(params) => {
            return <div>{params.row.deliveryStatus === "pending" ? (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />) : params.row.deliveryStatus === "dispatched" ? (<Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />) : params.row.deliveryStatus === "delivered" ? <Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" /> : <></>}</div>
        }},
        {
            field: "date",
            headerName: "Date",
            width: 130
        },
        {field: 'action', headerName: "Actions", width: 200, renderCell:(params) => {
            return <div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdDeliveryDining} onClick={() => {
                    handleDispatch(params.row.id)
                }} />
                <ActionBtn icon={MdDone} onClick={() => {
                    handleDeliver(params.row.id)
                }} />
                <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                    router.push(`/order/${params.row.id}`)
                }} />
            </div>
        }}
    ]

    const handleDispatch = React.useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: "dispatched" 
        }).then((res) => {
            toast.success("Order Dispatched")
            router.refresh()
        }).catch((err) => {
            toast.error("Ooops! something went wrong")
            console.log(err);
            
        })
    }, [])


    const handleDeliver = React.useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: "delivered" 
        }).then((res) => {
            toast.success("Order Delivered")
            router.refresh()
        }).catch((err) => {
            toast.error("Ooops! something went wrong")
            console.log(err);
            
        })
    }, [])


    

    return ( 
        <div className="max-w-[1350px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Orders" />
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
 
export default ManageOrderClient;