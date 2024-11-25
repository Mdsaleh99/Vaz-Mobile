"use client"

import AddressDisplay from "@/app/components/AddressDisplay";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/uitls/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps{
    order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {
    // const router = useRouter()
    return ( 
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div>
                <Heading title="Order Details" />
            </div>
            <div>Order ID: {order.id}</div>
            <div>
                Total Amount:{" "}
                <span className="font-bold">{formatPrice(order.amount / 100)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div>Payment Status:</div>
                <div>
                    {
                        order.status === "pending" ? (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />) :
                        order.status === "complete" ? (<Status text="complete" icon={MdDone} bg="bg-green-200" color="text-green-700" />) : 
                        (<></> )
                    }
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div>Delivery Status:</div>
                <div>
                    {
                        order.deliveryStatus === "pending" ? (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" 
                        />) :
                        order.deliveryStatus === "dispatched" ? (<Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />) : 
                        order.deliveryStatus === "delivered" ? (<Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />) : 
                        (<></> )
                    }
                </div>
            </div>
            <div>Date: {moment(order.createDate).fromNow()}</div>
            {/* <div>
                <AddressDisplay
                    city={order.address?.city || "N/A"}
                    country={order.address?.country || "N/A"}
                    line1={order.address?.line1 || "N/A"}
                    line2={order.address?.line2 || ""}
                    postal_code={order.address?.postal_code || "N/A"}
                    state={order.address?.state || "N/A"}
                />
            </div> */}
            <div>
                <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">PRODUCT</div>
                    <div className="justify-self-center">PRICE</div>
                    <div className="justify-self-center">QTY</div>
                    <div className="justify-self-end">TOTAL</div>
                </div>
                {order.products && order.products.map((item) => {
                    return <OrderItem key={item.id} item={item} />
                })}
            </div>
        </div>
    );
}
 
export default OrderDetails;