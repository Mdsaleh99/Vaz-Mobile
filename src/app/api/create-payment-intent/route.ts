import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import { getCurrentUser } from '../../../../actions/getCurrentUser'
import { formatPrice } from '@/uitls/formatPrice'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
console.log("Webhook Secret: ", process.env.STRIPE_WEBHOOK_SECRET);


const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity

        return acc + itemTotal 
    }, 0)

    const price: any = Math.floor(totalPrice) * 100

    return price
}



export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "inr",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      // update the order
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          // existing_order
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          // update_order
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);
      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid payment intent" },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: update_intent });
    }
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });
    // create the order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
    }
    
    return NextResponse.error()
}