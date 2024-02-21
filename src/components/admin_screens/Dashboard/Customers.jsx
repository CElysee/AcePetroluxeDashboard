import React, { useEffect, useState } from "react";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import AddNewCustomer from "./Modals/AddNewCustomer";
import axiosInstance from "../../../utils/axiosInstance";

function Customers() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [userRefresh, setUserRefresh] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/customer/all");
        const vendorCountResponse = await axiosInstance.get("/customer/count");
        // console.log(response.data);
        setAllCustomers(response.data);
        setCustomerCount(vendorCountResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, [userRefresh]);
  return (
    <>
      <TopMenu />
      <div className="echo group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen before:content-[''] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat">
        <SideMenu />
        <div className="content transition-[margin,width] duration-100 xl:pl-3.5 pt-[54px] pb-16 relative z-10 group mode xl:ml-[275px] [&.content--compact]:xl:ml-[91px] mode--light">
          <div className="mt-16 px-5">
            <div className="container">
              <div className="grid grid-cols-12 gap-x-6 gap-y-10">
                <div className="col-span-12">
                  <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
                    <div className="text-base font-medium group-[.mode--light]:text-white">
                      Costumers
                    </div>
                    <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row md:ml-auto">
                      <AddNewCustomer />
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-col gap-8">
                    <div className="box box--stacked flex flex-col p-5">
                      <div className="grid grid-cols-4 gap-5">
                        <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                          <div className="text-base text-slate-500">
                            Registered Vendors
                          </div>
                          <div className="mt-1.5 text-2xl font-medium">
                            {customerCount.customer_count}
                          </div>
                          <div className="absolute inset-y-0 right-0 mr-5 flex flex-col justify-center">
                            <div className="flex items-center rounded-full border border-danger/10 bg-danger/10 py-[2px] pl-[7px] pr-1 text-xs font-medium text-danger">
                              3%
                              <i
                                data-lucide="chevron-down"
                                className="ml-px h-4 w-4 stroke-[1.5]"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                          <div className="text-base text-slate-500">
                            Active Vendors
                          </div>
                          <div className="mt-1.5 text-2xl font-medium">
                            {customerCount.active_customer}
                          </div>
                          <div className="absolute inset-y-0 right-0 mr-5 flex flex-col justify-center">
                            <div className="flex items-center rounded-full border border-success/10 bg-success/10 py-[2px] pl-[7px] pr-1 text-xs font-medium text-success">
                              2%
                              <i
                                data-lucide="chevron-up"
                                className="ml-px h-4 w-4 stroke-[1.5]"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className="box col-span-4 rounded-[0.6rem] border border-dashed border-slate-300/80 p-5 shadow-sm md:col-span-2 xl:col-span-1">
                          <div className="text-base text-slate-500">
                            New Vendors
                          </div>
                          <div className="font-mediumm mt-1.5 text-2xl">
                            {customerCount.recently_added_customer}
                          </div>
                          <div className="absolute inset-y-0 right-0 mr-5 flex flex-col justify-center">
                            <div className="flex items-center rounded-full border border-danger/10 bg-danger/10 py-[2px] pl-[7px] pr-1 text-xs font-medium text-danger">
                              3%
                              <i
                                data-lucide="chevron-down"
                                className="ml-px h-4 w-4 stroke-[1.5]"
                              ></i>
                            </div>
                          </div>
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
                                Name
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                                Phone number
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                                Email
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                                Address
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 w-52 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                                Date Created
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 border-t border-slate-200/60 bg-slate-50 py-4 font-medium text-slate-500">
                                Status
                              </td>
                              <td className="px-5 border-b dark:border-darkmode-300 w-20 border-t border-slate-200/60 bg-slate-50 py-4 text-center font-medium text-slate-500">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {allCustomers.length > 0 &&
                              allCustomers.map((customer, index) => (
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
                                          {customer.customer_first_name} {customer.customer_last_name}
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                    <a
                                      className="whitespace-nowrap font-medium"
                                      href=""
                                    >
                                      {customer.customer_phone_number}
                                    </a>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                    <a
                                      className="whitespace-nowrap font-medium"
                                      href=""
                                    >
                                     {customer.customer_email}
                                    </a>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                    <div className="w-40">
                                      <div className="text-xs text-slate-500">
                                      {customer.customer_address}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                    <div className="w-40">
                                      <div className="text-xs text-slate-500">
                                      {customer.created_at}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 border-dashed py-4 dark:bg-darkmode-600">
                                    <div className="flex items-center justify-center text-success">
                                      <i
                                        data-lucide="database"
                                        className="h-3.5 w-3.5 stroke-[1.7]"
                                      ></i>
                                      <div className="ml-1.5 whitespace-nowrap">
                                      {customer.customer_status == true
                                          ? "Inactive"
                                          : "Active"}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 border-b dark:border-darkmode-300 relative border-dashed py-4 dark:bg-darkmode-600">
                                    <div className="flex items-center justify-center">
                                      <div
                                        data-tw-placement="bottom-end"
                                        className="dropdown relative h-5"
                                      >
                                        <button
                                          data-tw-toggle="dropdown"
                                          aria-expanded="false"
                                          className="cursor-pointer h-5 w-5 text-slate-500"
                                        >
                                          <i
                                            data-lucide="more-vertical"
                                            className="stroke-[1] w-5 h-5 fill-slate-400/70 stroke-slate-400/70"
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
                                                data-lucide="check-square"
                                                className="stroke-[1] mr-2 h-4 w-4"
                                              ></i>
                                              Edit
                                            </a>
                                            <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item text-danger">
                                              <i
                                                data-lucide="trash2"
                                                className="stroke-[1] mr-2 h-4 w-4"
                                              ></i>
                                              Delete
                                            </a>
                                          </div>
                                        </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
