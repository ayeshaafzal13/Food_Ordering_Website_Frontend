import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import FoodImage from "@/components/FoodImage";
import { photoForCuisines, photoUrl } from "@/config/images";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold">No orders yet</h2>
        <p className="mt-2 text-muted-foreground">
          When you place an order it will show up here with live tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {orders.map((order) => (
        <div key={order._id} className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <div className="aspect-[16/7] overflow-hidden rounded-xl">
              <FoodImage
                src={order.restaurant.imageUrl}
                fallback={photoUrl(photoForCuisines(order.restaurant.cuisines), 700, 300)}
                alt={order.restaurant.restaurantName}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;