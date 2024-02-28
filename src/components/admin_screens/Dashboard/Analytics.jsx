import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import OrderItemsList from "./Modals/OrderItemsList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function Analytics() {
  const [allOrders, SetAllOrders] = useState("");
  const [ordersCount, setOrdersCount] = useState("");
  const [userRefresh, setUserRefresh] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [analytics, setAnalytics] = useState("");
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const allOrders = await axiosInstance.get("/purchaseOrder/all");
        const countResponse = await axiosInstance.get("/purchaseOrder/count");
        const analytics = await axiosInstance.get("/analytics/general");
        // console.log(response.data);
        SetAllOrders(allOrders.data);
        setOrdersCount(countResponse.data);
        setUserRefresh(false);
        setAnalytics(analytics.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, [userRefresh]);
  return (
    <div className="content transition-[margin,width] duration-100 xl:pl-3.5 pt-[54px] pb-16 relative z-10 group mode xl:ml-[275px] mode--light [&.content--compact]:xl:ml-[91px]">
      <div className="mt-16 px-5">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12">
              <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
                <div className="text-base font-medium group-[.mode--light]:text-white">
                  General Report
                </div>
                <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row md:ml-auto">
                  <div className="relative">
                    <i
                      data-tw-merge=""
                      data-lucide="calendar-check2"
                      className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 stroke-[1.3] group-[.mode--light]:!text-slate-200"
                    ></i>
                    <select
                      data-tw-merge=""
                      className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1 rounded-[0.5rem] pl-9 group-[.mode--light]:!border-transparent group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:bg-chevron-white group-[.mode--light]:!text-slate-200 sm:w-44"
                    >
                      <option value="custom-date">Custom Date</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="relative">
                    <i
                      data-tw-merge=""
                      data-lucide="calendar"
                      className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 stroke-[1.3] group-[.mode--light]:!text-slate-200"
                    ></i>
                    <input
                      data-tw-merge=""
                      type="text"
                      className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 datepicker rounded-[0.5rem] pl-9 group-[.mode--light]:!border-transparent group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 sm:w-64"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
                <div className="flex gap-x-3 gap-y-2 md:ml-auto"></div>
              </div>
              <div className="-mx-2.5 mt-3.5">
                <div
                  data-config="performance-insight-slider-config"
                  className="tiny-slider"
                >
                  <div className="px-2.5 pb-3">
                    <div className="box box--stacked relative p-5">
                      <div className="flex items-center">
                        <div className="group flex items-center justify-center w-10 h-10 border rounded-full [&.primary]:border-primary/10 [&.primary]:bg-primary/10 [&.success]:border-success/10 [&.success]:bg-success/10 primary">
                          <i
                            data-tw-merge=""
                            data-lucide="inbox"
                            className="stroke-[1] w-5 h-5 group-[.primary]:text-primary group-[.primary]:fill-primary/10 group-[.success]:text-success group-[.success]:fill-success/10"
                          ></i>
                        </div>
                      </div>
                      <div className="mt-11">
                        <div className="text-base font-medium">Users</div>
                        <div className="mt-0.5 text-slate-500">
                          {analytics.users}
                        </div>
                      </div>
                      <a
                        className="mt-4 flex items-center border-t border-dashed pt-4 font-medium text-primary"
                        href={"/admin/users"}
                      >
                        View Users
                        <i
                          data-tw-merge=""
                          data-lucide="arrow-right"
                          className="stroke-[1] ml-1.5 h-4 w-4"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-2.5 pb-3">
                    <div className="box box--stacked relative p-5">
                      <div className="flex items-center">
                        <div className="group flex items-center justify-center w-10 h-10 border rounded-full [&.primary]:border-primary/10 [&.primary]:bg-primary/10 [&.success]:border-success/10 [&.success]:bg-success/10 primary">
                          <i
                            data-tw-merge=""
                            data-lucide="laptop"
                            className="stroke-[1] w-5 h-5 group-[.primary]:text-primary group-[.primary]:fill-primary/10 group-[.success]:text-success group-[.success]:fill-success/10"
                          ></i>
                        </div>
                      </div>
                      <div className="mt-11">
                        <div className="text-base font-medium">Vendors</div>
                        <div className="mt-0.5 text-slate-500">
                          {analytics.vendors}
                        </div>
                      </div>
                      <a
                        className="mt-4 flex items-center border-t border-dashed pt-4 font-medium text-primary"
                        href={"/admin/vendors"}
                      >
                        View Vendor
                        <i
                          data-tw-merge=""
                          data-lucide="arrow-right"
                          className="stroke-[1] ml-1.5 h-4 w-4"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-2.5 pb-3">
                    <div className="box box--stacked relative p-5">
                      <div className="flex items-center">
                        <div className="group flex items-center justify-center w-10 h-10 border rounded-full [&.primary]:border-primary/10 [&.primary]:bg-primary/10 [&.success]:border-success/10 [&.success]:bg-success/10 success">
                          <i
                            data-tw-merge=""
                            data-lucide="zap"
                            className="stroke-[1] w-5 h-5 group-[.primary]:text-primary group-[.primary]:fill-primary/10 group-[.success]:text-success group-[.success]:fill-success/10"
                          ></i>
                        </div>
                      </div>
                      <div className="mt-11">
                        <div className="text-base font-medium">Customers</div>
                        <div className="mt-0.5 text-slate-500">
                          {analytics.customers}
                        </div>
                      </div>
                      <a
                        className="mt-4 flex items-center border-t border-dashed pt-4 font-medium text-primary"
                        href={"/admin/customers"}
                      >
                        View Customers
                        <i
                          data-tw-merge=""
                          data-lucide="arrow-right"
                          className="stroke-[1] ml-1.5 h-4 w-4"
                        ></i>
                      </a>
                    </div>
                  </div>

                  <div className="px-2.5 pb-3">
                    <div className="box box--stacked relative p-5">
                      <div className="flex items-center">
                        <div className="group flex items-center justify-center w-10 h-10 border rounded-full [&.primary]:border-primary/10 [&.primary]:bg-primary/10 [&.success]:border-success/10 [&.success]:bg-success/10 success">
                          <i
                            data-tw-merge=""
                            data-lucide="fingerprint"
                            className="stroke-[1] w-5 h-5 group-[.primary]:text-primary group-[.primary]:fill-primary/10 group-[.success]:text-success group-[.success]:fill-success/10"
                          ></i>
                        </div>
                      </div>
                      <div className="mt-11">
                        <div className="text-base font-medium">
                          Purchase Orders
                        </div>
                        <div className="mt-0.5 text-slate-500">
                          {analytics.orders}
                        </div>
                      </div>
                      <a
                        className="mt-4 flex items-center border-t border-dashed pt-4 font-medium text-primary"
                        href={"/admin/purchase-orders"}
                      >
                        View Purchase Orders
                        <i
                          data-tw-merge=""
                          data-lucide="arrow-right"
                          className="stroke-[1] ml-1.5 h-4 w-4"
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center mb-2">
                <div className="text-base font-medium">
                  Recent Purchase Orders
                </div>
                <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row md:ml-auto">
                  <div className="relative">
                    <i
                      data-tw-merge=""
                      data-lucide="calendar-check2"
                      className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 stroke-[1.3]"
                    ></i>
                    <select
                      data-tw-merge=""
                      className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1 rounded-[0.5rem] pl-9 sm:w-44"
                    >
                      <option value="custom-date">Custom Date</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="relative">
                    <i
                      data-tw-merge=""
                      data-lucide="calendar"
                      className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 stroke-[1.3]"
                    ></i>
                    <input
                      data-tw-merge=""
                      type="text"
                      className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 datepicker rounded-[0.5rem] pl-9 sm:w-64"
                    />
                  </div>
                </div>
              </div>
              <div className="box box--stacked flex flex-col">
                <div className="flex flex-col gap-y-2 p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="relative">
                      <i
                        data-lucide="search"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 stroke-[1.3] text-slate-500"
                      ></i>
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 rounded-[0.5rem] pl-9 sm:w-64"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-x-3 gap-y-2 sm:ml-auto sm:flex-row">
                    <div
                      data-tw-placement="bottom-end"
                      className="dropdown relative"
                    >
                      <button
                        data-tw-toggle="dropdown"
                        aria-expanded="false"
                        className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20 [&:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-full sm:w-auto"
                      >
                        <i
                          data-lucide="download"
                          className="mr-2 h-4 w-4 stroke-[1.3]"
                        ></i>
                        Export
                        <i
                          data-lucide="chevron-down"
                          className="ml-2 h-4 w-4 stroke-[1.3]"
                        ></i>
                      </button>
                      <div
                        data-transition=""
                        data-selector=".show"
                        data-enter="transition-all ease-linear duration-150"
                        data-enter-from="absolute !mt-5 invisible opacity-0 translate-y-1"
                        data-enter-to="!mt-1 visible opacity-100 translate-y-0"
                        data-leave="transition-all ease-linear duration-150"
                        data-leave-from="!mt-1 visible opacity-100 translate-y-0"
                        data-leave-to="absolute !mt-5 invisible opacity-0 translate-y-1"
                        className="dropdown-menu absolute z-[9999] hidden"
                      >
                        <div className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 w-40">
                          <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                            <i
                              data-lucide="file-bar-chart"
                              className="stroke-[1] mr-2 h-4 w-4"
                            ></i>
                            PDF
                          </a>
                          <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                            <i
                              data-lucide="file-bar-chart"
                              className="stroke-[1] mr-2 h-4 w-4"
                            ></i>
                            CSV
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      data-tw-placement="bottom-end"
                      className="dropdown relative inline-block"
                    >
                      <button
                        data-tw-toggle="dropdown"
                        aria-expanded="false"
                        className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20 [&:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-full sm:w-auto"
                      >
                        <i
                          data-lucide="arrow-down-wide-narrow"
                          className="mr-2 h-4 w-4 stroke-[1.3]"
                        ></i>
                        Filter
                      </button>
                      <div
                        data-transition=""
                        data-selector=".show"
                        data-enter="transition-all ease-linear duration-150"
                        data-enter-from="absolute !mt-5 invisible opacity-0 translate-y-1"
                        data-enter-to="!mt-1 visible opacity-100 translate-y-0"
                        data-leave="transition-all ease-linear duration-150"
                        data-leave-from="!mt-1 visible opacity-100 translate-y-0"
                        data-leave-to="absolute !mt-5 invisible opacity-0 translate-y-1"
                        className="dropdown-menu absolute z-[9999] hidden"
                      >
                        <div className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600">
                          <div className="p-2">
                            <div>
                              <div className="text-left text-slate-500">
                                User Role
                              </div>
                              <select className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1 mt-2 flex-1">
                                <option value="Support Specialist">
                                  Admin
                                </option>
                                <option value="Marketing Coordinator">
                                  User
                                </option>
                                <option value="Sales Manager">
                                  Accountant
                                </option>
                              </select>
                            </div>
                            <div className="mt-4 flex items-center">
                              <button className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-secondary/70 border-secondary/70 text-slate-500 dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300 [&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100 [&:hover:not(:disabled)]:dark:border-darkmode-300/80 [&:hover:not(:disabled)]:dark:bg-darkmode-300/80 ml-auto w-32">
                                Close
                              </button>
                              <button className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary ml-2 w-32">
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table data-tw-merge className="w-full text-left">
                    <thead className="">
                      <tr className="">
                        <td className="px-5 border-b dark:border-darkmode-300 w-5 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          <input
                            type="checkbox"
                            className="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50"
                          />
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Order number
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Vendor
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Customer Name
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Items
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Date Created
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Status
                        </td>
                        <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                          Export
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.length > 0 &&
                        allOrders.map((order, index) => (
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
                                    {order.order.po_number}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <a
                                className="whitespace-nowrap font-medium"
                                href=""
                              >
                                {order.vendor.vendor_name}
                              </a>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <a
                                className="whitespace-nowrap font-medium"
                                href=""
                              >
                                {order.customer.customer_first_name}{" "}
                                {order.customer.customer_last_name}
                              </a>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <div className="w-40">
                                <button
                                  data-tw-merge
                                  data-tw-toggle="modal"
                                  data-tw-target="#superlarge-slide-over-size-preview"
                                  onClick={() => setOrderId(order.order.id)}
                                  className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mb-2 mr-1 mb-2 mr-1"
                                >
                                  <i
                                    data-tw-merge=""
                                    data-lucide="shopping-basket"
                                    className="mr-2 h-4 w-4 stroke-[1.3]"
                                  ></i>
                                  Items
                                </button>
                              </div>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <div className="w-40">
                                <div className="text-xs text-slate-500">
                                  {order.order.created_at}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <div className="w-40">
                                <div className="text-xs text-slate-500">
                                  {order.order.po_status}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                              <div className="w-40">
                                <div className="text-xs text-slate-500">
                                  <a
                                    href={`/admin/purchase-orders-invoice/${order.order.id}`}
                                    className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mb-2 mr-1 mb-2 mr-1"
                                  >
                                    <i
                                      data-tw-merge=""
                                      data-lucide="download-cloud"
                                      className="mr-2 h-4 w-4 stroke-[1.3]"
                                    ></i>
                                    Export
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-reverse flex flex-col-reverse flex-wrap items-center gap-y-2 p-5 sm:flex-row">
                  <select className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1 rounded-[0.5rem] sm:w-20">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
              <OrderItemsList orderId={orderId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
