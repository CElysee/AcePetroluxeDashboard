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

function AddNewVendor({ vendorId, setUserRefresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [countryId, setCountryId] = useState("");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
  const dismissButtonRef = useRef();
  const imageBaseUrl = import.meta.env.VITE_REACT_APP_API;
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/country/all");
        // console.log(response.data);
        setCountry(response.data);
        if (vendorId) {
          const response = await axiosInstance.get(`/vendor/${vendorId}`);
          setName(response.data.vendor_name);
          setEmail(response.data.vendor_email);
          setPhoneNumber(response.data.vendor_contact_number);
          setAddress(response.data.vendor_address);
          setStatus(response.data.vendor_status);
          setCountryId(response.data.vendor_country);
          setLogo(response.data.vendor_logo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone_number":
        setPhoneNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "country":
        setCountryId(value);
        break;
      case "logo": {
        const selectedFile = e.target.files[0];
        setLogo(selectedFile);
        break;
      }
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("vendor_name", name);
    formData.append("vendor_email", email);
    formData.append("vendor_contact_number", phoneNumber);
    formData.append("vendor_address", address);
    formData.append("vendor_status", status);
    formData.append("vendor_country", countryId);
    formData.append("vendor_logo", logo);
    // console.log(params);
    // console.log(Object.fromEntries(formData.entries()));
    const submitNewUser = async () => {
      try {
        const response = await axiosInstance.put(
          `/vendor/update?vendor_id=${vendorId}`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        notify(response.data.message, "success");
        setLoading(false);
        dismissButtonRef.current.click();
        setUserRefresh(true);
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
      <div
        data-tw-backdrop=""
        aria-hidden="true"
        tabIndex="-1"
        id="header-footer-modal-preview-editVendor"
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
                            <div className="font-medium">Full Name</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Enter your full name
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <div className="flex flex-col items-center md:flex-row">
                          <input
                            type="text"
                            placeholder="VIVO"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 first:rounded-b-none last:-mt-px last:rounded-t-none focus:z-10 first:md:rounded-r-none first:md:rounded-bl-md last:md:-ml-px last:md:mt-0 last:md:rounded-l-none last:md:rounded-tr-md [&amp;:not(:first-child):not(:last-child)]:-mt-px [&amp;:not(:first-child):not(:last-child)]:rounded-none [&amp;:not(:first-child):not(:last-child)]:md:-ml-px [&amp;:not(:first-child):not(:last-child)]:md:mt-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Email</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Please provide a valid email address that you have
                            access to.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <input
                          type="email"
                          placeholder="leonardo.dicaprio@left4code.com"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10"
                        />
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Phone Number</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Please provide a valid phone number.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <div className="flex flex-col items-center md:flex-row">
                          <input
                            type="number"
                            placeholder="078*******"
                            name="phone_number"
                            value={phoneNumber}
                            onChange={handleChange}
                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 first:rounded-b-none last:-mt-px last:rounded-t-none focus:z-10 first:md:rounded-r-none first:md:rounded-bl-md last:md:-ml-px last:md:mt-0 last:md:rounded-l-none last:md:rounded-tr-md [&amp;:not(:first-child):not(:last-child)]:-mt-px [&amp;:not(:first-child):not(:last-child)]:rounded-none [&amp;:not(:first-child):not(:last-child)]:md:-ml-px [&amp;:not(:first-child):not(:last-child)]:md:mt-0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Address</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Please provide a valid address.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <input
                          type="text"
                          placeholder="KK 215st Kigali, Rwanda"
                          name="address"
                          value={address}
                          onChange={handleChange}
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 first:rounded-b-none last:-mt-px last:rounded-t-none focus:z-10 first:md:rounded-r-none first:md:rounded-bl-md last:md:-ml-px last:md:mt-0 last:md:rounded-l-none last:md:rounded-tr-md [&amp;:not(:first-child):not(:last-child)]:-mt-px [&amp;:not(:first-child):not(:last-child)]:rounded-none [&amp;:not(:first-child):not(:last-child)]:md:-ml-px [&amp;:not(:first-child):not(:last-child)]:md:mt-0"
                        />
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Country</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Choose country
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <select
                          onChange={handleChange}
                          name="country"
                          value={countryId}
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1"
                        >
                          <option value="">Select country</option>
                          {country.length > 0 &&
                            country.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Logo*</div>

                            <img
                              src={`${imageBaseUrl}/vendorLogo/${logo}`}
                              width={100}
                            />
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Please provide a valid logo
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <div className="flex flex-col items-center md:flex-row">
                          <input
                            type="file"
                            name="logo"
                            onChange={handleChange}
                            accept="image/*"
                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 first:rounded-b-none last:-mt-px last:rounded-t-none focus:z-10 first:md:rounded-r-none first:md:rounded-bl-md last:md:-ml-px last:md:mt-0 last:md:rounded-l-none last:md:rounded-tr-md [&amp;:not(:first-child):not(:last-child)]:-mt-px [&amp;:not(:first-child):not(:last-child)]:rounded-none [&amp;:not(:first-child):not(:last-child)]:md:-ml-px [&amp;:not(:first-child):not(:last-child)]:md:mt-0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 block flex-col pt-5 first:mt-0 first:pt-0 sm:flex xl:flex-row xl:items-center">
                      <div className="mb-2 inline-block sm:mb-0 sm:mr-5 sm:text-right xl:mr-14 xl:w-60">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Status</div>
                          </div>
                          <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 xl:mt-3">
                            Select status
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex-1 xl:mt-0">
                        <select
                          onChange={(e) => handleChange(e)}
                          name="status"
                          value={status}
                          className="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1"
                        >
                          <option value="">Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
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
                        "Update a vendor"
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

export default AddNewVendor;
