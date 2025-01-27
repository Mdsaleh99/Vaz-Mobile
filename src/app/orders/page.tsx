export const dynamic = "force-dynamic";
import Container from "@/app/components/Container";
import OrderClient from "./OrderClient";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import getOrderByUserId from "../../../actions/getOrderByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Ooops! Access Denied" />;
  }

  const orders = await getOrderByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="p-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
