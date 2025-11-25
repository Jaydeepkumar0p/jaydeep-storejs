import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useCartStore } from "../zustand/cart";

const Checkout = () => {
  const {
    cartItems,
    shippingAddress,
    setShippingAddress,
    createCheckoutSession,
  } = useCartStore();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    shippingAddress || {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.address || !form.city || !form.postalCode || !form.country) {
      alert("All address fields are required");
      return false;
    }
    return true;
  };

  const payHandler = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setShippingAddress(form);

      const data = await createCheckoutSession();
      window.location.href = data.url; // redirect to Stripe
    } catch (err) {
      alert(err.response?.data?.error || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white px-5 py-10 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="bg-[#111] border border-orange-600/40 p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-orange-500 mb-6">Checkout</h1>
          <div className="flex flex-col gap-4">
            <input className="bg-black border border-orange-700 text-white p-3 rounded-xl" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            <input className="bg-black border border-orange-700 text-white p-3 rounded-xl" name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input className="bg-black border border-orange-700 text-white p-3 rounded-xl" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} />
            <input className="bg-black border border-orange-700 text-white p-3 rounded-xl" name="country" placeholder="Country" value={form.country} onChange={handleChange} />
          </div>

          <button
            onClick={payHandler}
            disabled={loading}
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded-xl text-lg font-bold flex justify-center items-center gap-2"
          >
            <FaLock />
            {loading ? "Processing..." : "Pay Securely"}
          </button>
        </div>

        <div className="bg-[#111] border border-orange-600/40 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Order Summary</h2>
          {cartItems.map((i) => (
            <div key={i._id} className="flex justify-between border-b border-orange-600/20 pb-4 mb-3">
              <div>
                <p className="text-lg font-semibold text-orange-300">{i.name}</p>
                <p className="text-sm text-gray-400">Qty: {i.qty}</p>
              </div>
              <span className="text-orange-400 font-bold">₹{i.qty * i.price}</span>
            </div>
          ))}
          <div className="mt-6 flex justify-between text-xl font-bold text-orange-300">
            <span>Total:</span>
            <span>₹{subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
