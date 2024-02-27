import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};

function AddNewOrder({ userRefresh }) {
  const [vendorId, setVendorId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [vendors, SetVendors] = useState("");
  const [customers, SetCustomers] = useState("");
  const [po_additional_notes, setPo_additional_notes] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([
    {
      po_item_description: "",
      po_item_quantity: "",
      po_item_unit_price: "",
      po_item_total_price: "",
    },
  ]);

  const dismissButtonRef = useRef();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const VendorResponse = await axiosInstance.get("/vendor/all");
        const CustomerResponse = await axiosInstance.get("/customer/all");
        // console.log(response.data);
        SetVendors(VendorResponse.data);
        SetCustomers(CustomerResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, []);
  const addItemList = () => {
    setItemList([
      ...itemList,
      {
        po_item_description: "",
        po_item_quantity: "",
        po_item_unit_price: "",
        po_item_total_price: "",
      },
    ]);
  };
  const removeItemList = (index) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "vendorId":
        setVendorId(value);
        break;
      case "customerId":
        setCustomerId(value);
        break;
      case "orderStatus":
        setOrderStatus(value);
        break;
      case "po_additional_notes":
        setPo_additional_notes(value);
        break;
      default:
        break;
    }
  };
  const handleItemInputChange = (e, index) => {
    const { name, value } = e.target;
    const newInputFields = [...itemList];
    newInputFields[index][name] = value;
    setItemList(newInputFields);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      po_vendor_id: vendorId,
      po_customer_id: customerId,
      po_status: orderStatus,
      itemList: itemList,
      po_additional_notes: po_additional_notes,
    };
    console.log(params);
    const submitItems = async () => {
      try {
        const response = await axiosInstance.post(
          "/purchaseOrder/create",
          params,
          {}
        );
        // console.log(response.data);
        notify(response.data.message, "success");
        setLoading(false);
        dismissButtonRef.current.click();
        userRefresh(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    submitItems();
  };

  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        icon: "👏",
      });
    } else if (type === "error") {
      toast.error(message, {
        icon: "😬",
      });
    }
  };
  return (
    <>
      <ToastContainer autoClose={false} />
      <button
        data-tw-merge
        data-tw-toggle="modal"
        data-tw-target="#header-footer-modal-preview"
        href="#"
        className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none  [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70  bg-primary border-primary text-white dark:border-primary mb-2 mr-1 mb-2 mr-1"
      >
        <i
          data-tw-merge=""
          data-lucide="pen-line"
          className="mr-2 h-4 w-4 stroke-[1.3]"
        ></i>
        Add New Order
      </button>
      <div
        data-tw-backdrop=""
        aria-hidden="true"
        tabIndex="-1"
        id="header-footer-modal-preview"
        className="modal group bg-gradient-to-b from-theme-1/50 via-theme-2/50 to-black/50 transition-[visibility,opacity] w-screen h-screen fixed left-0 top-0 [&:not(.show)]:duration-[0s,0.2s] [&:not(.show)]:delay-[0.2s,0s] [&:not(.show)]:invisible [&:not(.show)]:opacity-0 [&.show]:visible [&.show]:opacity-100 [&.show]:duration-[0s,0.4s]"
      >
        <div
          data-tw-merge
          className="w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-[margin-top,transform] duration-[0.4s,0.3s] -mt-16 group-[.show]:mt-16 group-[.modal-static]:scale-[1.05] dark:bg-darkmode-600    sm:w-[600px] lg:w-[900px] p-10 text-center"
        >
          <form onSubmit={handleSubmit}>
            <div className="col-span-12 sm:col-span-10 sm:col-start-2 pb-3">
              <div className="mt-7">
                <div className="box box--stacked flex flex-col">
                  <div className="p-7">
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Vendor</div>
                            <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                              Required
                            </div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Choose Vendor
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <select
                          onChange={handleChange}
                          required
                          name="vendorId"
                          value={vendorId}
                          className="disabled:bg-slate-100  disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent  group-[.form-inline]:flex-1"
                        >
                          <option value="">Select vendor</option>
                          {vendors.length > 0 &&
                            vendors.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.vendor_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Customer</div>
                            <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                              Required
                            </div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Choose Customer
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <select
                          onChange={handleChange}
                          required
                          name="customerId"
                          value={customerId}
                          className="disabled:bg-slate-100  disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent  group-[.form-inline]:flex-1"
                        >
                          <option value="">Select customer</option>
                          {customers.length > 0 &&
                            customers.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.customer_first_name}{" "}
                                {item.customer_last_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Status</div>
                            <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                              Required
                            </div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Choose Status
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <select
                          onChange={handleChange}
                          required
                          name="orderStatus"
                          value={orderStatus}
                          className="disabled:bg-slate-100  disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent  group-[.form-inline]:flex-1"
                        >
                          <option value="">Select customer</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </div>
                    </div>
                    {itemList.map((item, index) => (
                      <div className="item-section w-full" key={index}>
                        <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                          <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                            <div className="text-left">
                              <div className="flex items-center">
                                <div className="font-medium">Description</div>
                                <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                                  Required
                                </div>
                              </div>
                              <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                                Please provide correct description
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 w-full flex-1 xl:mt-0">
                            <textarea
                              name="po_item_description"
                              rows={4}
                              required
                              value={itemList[index].po_item_description}
                              onChange={(e) => handleItemInputChange(e, index)}
                              className=" transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40    "
                            ></textarea>
                          </div>
                        </div>
                        <div
                          className="mt-5 pt-5  sm:flex"
                          style={{ gap: "10px" }}
                        >
                          <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                            <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right">
                              <div className="text-left">
                                <div className="flex items-center">
                                  <div className="font-medium">Qantity</div>
                                  <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                                    Required
                                  </div>
                                </div>
                                <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                                  Please provide correct qantity
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              <input
                                type="number"
                                placeholder="20"
                                name="po_item_quantity"
                                value={itemList[index].po_item_quantity}
                                onChange={(e) =>
                                  handleItemInputChange(e, index)
                                }
                                required
                                className="transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40"
                              />
                            </div>
                          </div>
                          <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                            <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right">
                              <div className="text-left">
                                <div className="flex items-center">
                                  <div className="font-medium">Unity price</div>
                                  <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                                    Required
                                  </div>
                                </div>
                                <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                                  Please provide correct unit price
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center md:flex-row">
                              <input
                                type="number"
                                placeholder="20"
                                name="po_item_unit_price"
                                value={itemList[index].po_item_unit_price}
                                onChange={(e) =>
                                  handleItemInputChange(e, index)
                                }
                                required
                                className=" transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40"
                              />
                            </div>
                          </div>
                          <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                            <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right">
                              <div className="text-left">
                                <div className="flex items-center">
                                  <div className="font-medium">Total</div>
                                  <div className="ml-2.5 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-darkmode-300 dark:text-slate-400">
                                    Required
                                  </div>
                                </div>
                                <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                                  Please provide correct total price
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                              <input
                                type="number"
                                placeholder="20"
                                name="po_item_total_price"
                                value={itemList[index].po_item_total_price}
                                onChange={(e) =>
                                  handleItemInputChange(e, index)
                                }
                                required
                                className=" transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-red-800">{error}</div>
                        <div className="flex border-t border-slate-200/80 px-7 py-5 md:justify-end">
                          {itemList.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => removeItemList(index)}
                              className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none  [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70  border-secondary mr-1"
                            >
                              -
                            </button>
                          ) : null}

                          {itemList.length - 1 === index ? (
                            <button
                              type="button"
                              onClick={addItemList}
                              className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none  [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 bg-primary border-primary text-white dark:border-primary"
                            >
                              +
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Additional Note</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Please provide correct additional note
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <textarea
                          name="po_additional_notes"
                          rows={4}
                          value={po_additional_notes}
                          onChange={handleChange}
                          className=" transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40    "
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="flex border-t border-slate-200/80 px-7 py-5 md:justify-end">
                    <button
                      ref={dismissButtonRef}
                      data-tw-merge
                      data-tw-dismiss="modal"
                      type="button"
                      className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none  [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70  border-secondary   w-20 mr-1 w-20"
                    >
                      <i
                        data-tw-merge=""
                        data-lucide="x"
                        className="stroke-[1] w-5 h-5 side-menu__link__icon"
                      ></i>
                      Cancel
                    </button>
                    <button
                      data-tw-merge
                      type="submit"
                      className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none  [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70  bg-primary border-primary text-white dark:border-primary"
                    >
                      <i
                        data-tw-merge=""
                        data-lucide="send"
                        className="stroke-[1] w-5 h-5 side-menu__link__icon px-1"
                      ></i>
                      {loading ? (
                        <RiseLoader
                          color={color}
                          loading={loading}
                          cssOverride={override}
                          size={10}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Add new order"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewOrder;
