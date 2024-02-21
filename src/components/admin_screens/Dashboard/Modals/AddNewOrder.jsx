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

function AddNewOrder() {

  const [vendorId, setVendorId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [vendors, SetVendors] = useState("");
  const [customers, SetCustomers] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {

      case "vendorId":
        setVendorId(value);
        break;
      case "customerId":
        setCustomerId(value);
        break

      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('vendor_name', name);
    formData.append('vendor_email', email);
    formData.append('vendor_contact_number', phoneNumber);
    formData.append('vendor_address', address);
    formData.append('vendor_status', status);
    formData.append('vendor_country', countryId);
    formData.append('vendor_logo', logo);
    // console.log(params);
      // console.log(Object.fromEntries(formData.entries()));
    const submitNewUser = async () => {
      try {
        const response = await axiosInstance.post("/vendor/create", formData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        notify(response.data.message, "success");
        setLoading(false);
        dismissButtonRef.current.click();
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.response.data.detail);
      }
    };
    submitNewUser();
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
        className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mb-2 mr-1 mb-2 mr-1"
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
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1"
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
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1"
                        >
                          <option value="">Select customer</option>
                          {customers.length > 0 &&
                            customers.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.customer_first_name} {item.customer_last_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-red-800">{error}</div>
                  <div className="flex border-t border-slate-200/80 px-7 py-5 md:justify-end">
                    <button
                      ref={dismissButtonRef}
                      data-tw-merge
                      data-tw-dismiss="modal"
                      type="button"
                      className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary   w-20 mr-1 w-20"
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
                      className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary"
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
