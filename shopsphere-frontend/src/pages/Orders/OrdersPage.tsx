import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2 Jun 2024",
    status: "Delivered",
    total: 4599,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "28 May 2024",
    status: "Shipped",
    total: 2199,
    items: 1,
  },
  {
    id: "ORD-003",
    date: "15 May 2024",
    status: "Confirmed",
    total: 8999,
    items: 5,
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Confirmed: "bg-amber-100 text-amber-700",
  Pending: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            Welcome back, {user?.username}
          </p>

          {mockOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link
                to="/products"
                className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.date} · {order.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColor[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <p className="font-bold text-gray-900">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                      View Details
                    </button>
                    {order.status === "Delivered" && (
                      <button className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                        · Write Review
                      </button>
                    )}
                    {order.status === "Pending" && (
                      <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                        · Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
