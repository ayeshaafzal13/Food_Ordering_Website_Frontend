import type { CartItem } from "@/pages/DetailPage";
import type { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash2 } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl font-extrabold tracking-tight">
          <span>Your Order</span>
          <span className="text-primary">£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {cartItems.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Your basket is empty. Tap a dish to add it.
          </p>
        )}
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center">
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              <span className="truncate">{item.name}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 font-semibold">
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item)}
                className="text-destructive transition-transform hover:scale-110"
              >
                <Trash2 size={18} />
              </button>
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Delivery</span>
          <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
