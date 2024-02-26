import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

function OrderItemsList({ orderId }) {
  const [itemList, setItemList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchOrderItems = async () => {
      if (orderId) {
        try {
          const response = await axiosInstance.get(
            `/purchaseOrder/item_list?order_id=${orderId}`
          );
        //   console.log(response.data);
          setItemList(response.data.items);
          setTotalPrice(response.data.item_total_price);
          setTotalQuantity(response.data.item_quantity_total);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchOrderItems();
  }, [orderId]);

  return (
    <div
      data-tw-backdrop=""
      aria-hidden="true"
      tabIndex="-1"
      id="superlarge-slide-over-size-preview"
      className="modal group bg-gradient-to-b from-theme-1/50 via-theme-2/50 to-black/50 transition-[visibility,opacity] w-screen h-screen fixed left-0 top-0 [&:not(.show)]:duration-[0s,0.2s] [&:not(.show)]:delay-[0.2s,0s] [&:not(.show)]:invisible [&:not(.show)]:opacity-0 [&.show]:visible [&.show]:opacity-100 [&.show]:duration-[0s,0.4s]"
    >
      <div
        data-tw-merge
        className="w-[90%] ml-auto h-screen flex flex-col bg-white relative shadow-md transition-[margin-right] duration-[0.6s] -mr-[100%] group-[.show]:mr-0 dark:bg-darkmode-600    sm:w-[600px] lg:w-[900px]"
      >
        <div
          data-tw-merge
          className="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400 p-5"
        >
          <h2 className="mr-auto text-base font-medium">
            Purchase order number #{orderId} item list
          </h2>
        </div>
        <div data-tw-merge className="p-5 overflow-y-auto flex-1">
          <div className="overflow-auto xl:overflow-visible">
            <table className="w-full text-left border-b border-slate-200/60">
              <thead className="">
                <tr className="">
                  <td className="px-5 border-b dark:border-darkmode-300 w-5 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    <input
                      type="checkbox"
                      className="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50"
                    />
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Description
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Quantity
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Unit Price
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Total Price
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Date Created
                  </td>
                </tr>
              </thead>
              <tbody>
                {itemList.length > 0 &&
                  itemList.map((item, index) => (
                    <tr className="last:border-b-0" key={index}>
                      <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                        <input
                          type="checkbox"
                          className="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50"
                        />
                      </td>
                      <td className="px-5 border-b dark:border-darkmode-300 w-80 border-dashed py-4 dark:bg-darkmode-600">
                        <div className="flex items-center">
                          <div className="ml-3.5">
                            <a
                              className="whitespace-nowrap font-medium"
                              href=""
                            >
                              {item.po_item_description}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                        <a className="whitespace-nowrap font-medium" href="">
                          {item.po_item_quantity} lts
                        </a>
                      </td>
                      <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                        <a className="whitespace-nowrap font-medium" href="">
                          {item.po_item_unit_price} Rwf
                        </a>
                      </td>
                      <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                        <a className="whitespace-nowrap font-medium" href="">
                          {item.po_item_total_price} Rwf
                        </a>
                      </td>
                      <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                        <a className="whitespace-nowrap font-medium" href="">
                          {item.created_at}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <thead className="">
                <tr className="">
                  <td className="px-5 border-b dark:border-darkmode-300 w-5 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    <input
                      type="checkbox"
                      className="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50"
                    />
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    Total
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    {totalQuantity} lts
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                    {totalPrice} Rwf
                  </td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500"></td>
                  <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500"></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItemsList;
