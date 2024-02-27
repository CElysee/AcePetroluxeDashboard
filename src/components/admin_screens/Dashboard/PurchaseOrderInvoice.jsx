import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { format } from "date-fns";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function PurchaseOrderInvoice() {
  const [orderDetails, setOrderDetails] = useState([]);
  const { id } = useParams();
  const container = React.useRef(null);
  const pdfExportComponent = useRef(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(
          `/purchaseOrder/order_id?id=${id}`
        );
        // console.log(response.data[0]);
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [id]);
  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Purchase-order #${orderDetails[0].order.po_number} - ${orderDetails[0].vendor.vendor_name} - ${orderDetails[0].order.created_at}`,
    });
  };
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  // console.log(id)
  return (
    <>
      <div className="col-span-12 xl:col-span-12 m-5">
        <div className="flex flex-center">
          <Button
            className="mb-3 transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary group-[.mode--light]:!border-transparent group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200"
            primary={true}
            onClick={exportPDFWithMethod}
          >
            {" "}
            <i
              data-tw-merge=""
              data-lucide="printer"
              className="mr-3 h-4 w-4 stroke-[1.3]"
            ></i>
            Print
          </Button>
        </div>
      </div>
      <PDFExport ref={pdfExportComponent}>
        <div className="pdf-page container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12">
              {orderDetails.length > 0 &&
                orderDetails.map((order, index) => (
                  <div
                    className="mt-3.5 grid grid-cols-12 gap-x-6 gap-y-10"
                    key={index}
                  >
                    <div className="col-span-12 xl:col-span-12">
                      <div className="box box--stacked flex flex-col p-5 sm:p-14">
                        <div className="flex flex-col gap-y-7 rounded-lg border border-primary/5 bg-primary/[0.03] px-8 py-12 sm:-mx-10 sm:-mt-10 sm:px-10 sm:py-16 md:flex-row">
                          <div className="flex flex-col justify-center">
                            <img
                              src="/assets/images/logo/logo1.jpg"
                              width={"200px"}
                            />
                          </div>
                          <div className="md:ml-auto md:text-right">
                            <div className="-mt-1 text-lg font-medium text-primary">
                              # PURCHASE ORDER
                            </div>
                            <div className="mt-1">#1</div>
                            <div className="mt-7 flex flex-col gap-1">
                              <div>
                                {order.customer.customer_first_name}{" "}
                                {order.customer.customer_first_name}
                              </div>
                              <div>
                                {order.customer.customer_address}, Kigali Rwanda
                              </div>
                              <div>{order.customer.customer_phone_number}</div>
                              <div>{order.customer.customer_email}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex flex-col px-8 pt-4 sm:flex-row sm:px-0">
                          <div>
                            <div className="text-slate-500">Bill to :</div>
                            <div className="mt-1.5 text-base font-medium text-primary">
                              {order.vendor.vendor_name}
                            </div>
                            <div className="mt-1.5 flex flex-col gap-1">
                              <div>{order.vendor.vendor_address}</div>
                              <div>{order.vendor.vendor_email}</div>
                              <div>{order.vendor.vendor_contact_number}</div>
                            </div>
                          </div>
                          <div className="mt-7 flex flex-col gap-4 sm:ml-auto sm:mt-0 sm:text-right">
                            <div>
                              <div className="text-slate-500">
                                Purchase order date :
                              </div>
                              <div className="mt-1.5 font-medium text-slate-600">
                                {format(
                                  new Date(order.order.created_at),
                                  "dd/MM/yyyy"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 rounded-[0.6rem] border border-slate-200/80">
                          <div className="overflow-auto xl:overflow-visible">
                            <table className="w-full text-left">
                              <thead className="">
                                <tr className="">
                                  <td className="px-5 border-b dark:border-darkmode-300 border-slate-200/80 bg-slate-50 py-4 font-medium text-slate-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem]">
                                    Item
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-slate-200/80 bg-slate-50 py-4 text-right font-medium text-slate-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem]">
                                    Quantity
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-slate-200/80 bg-slate-50 py-4 text-right font-medium text-slate-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem]">
                                    Unit Price
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-slate-200/80 bg-slate-50 py-4 text-right font-medium text-slate-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem]">
                                    Amount
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, index) => (
                                  <tr
                                    className="[&amp;_td]:last:border-b-0"
                                    key={index}
                                  >
                                    <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                      <div className="flex items-center">
                                        <div className="whitespace-nowrap">
                                          {item.po_item_description}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 text-right dark:bg-darkmode-600">
                                      <div className="whitespace-nowrap">
                                        {item.po_item_unit_price}
                                      </div>
                                    </td>
                                    <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 text-right dark:bg-darkmode-600">
                                      <div className="whitespace-nowrap">
                                        {item.po_item_unit_price.toLocaleString(
                                          "en-US"
                                        )}{" "}
                                        Rwf
                                      </div>
                                    </td>
                                    <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 text-right dark:bg-darkmode-600">
                                      <div className="whitespace-nowrap font-medium">
                                        {item.po_item_total_price.toLocaleString(
                                          "en-US"
                                        )}{" "}
                                        Rwf
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="my-10 ml-auto flex flex-col gap-3.5 pr-5 text-right">
                          <div className="flex items-center justify-end">
                            <div className="text-slate-500">Subtotal:</div>
                            <div className="w-20 font-medium text-slate-600 sm:w-52" style={{fontWeight: "bold"}}>
                              {order.item_total_price.toLocaleString("en-US")}{" "}
                              Rwf
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <div className="text-slate-500">Total:</div>
                            <div className="w-20 font-medium text-slate-600 sm:w-52" style={{fontWeight: "bold"}}>
                              {order.item_total_price.toLocaleString("en-US")}{" "}
                              Rwf
                            </div>
                          </div>
                        </div>
                        <div className="-mx-8 border-t border-dashed border-slate-200/80 px-10 pt-6">
                          <div className="text-base font-medium">
                            Authorized By Elvis
                          </div>
                          <div className="mt-5 text-slate-500">
                            Additional Notes:
                          </div>
                          <div className="mt-5 text-slate-500">
                            {order.order.po_additional_notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
}

export default PurchaseOrderInvoice;
