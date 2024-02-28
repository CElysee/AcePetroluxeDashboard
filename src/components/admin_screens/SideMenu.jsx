import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../assets/features/auth/authSlice";

function SideMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You are about to logout");
    dispatch(logout()); // dispatch logout action
    navigate("/login");
  };
  return (
    <>
      <div className="side-menu xl:ml-0 shadow-xl transition-[margin,padding] duration-300 xl:shadow-none fixed top-0 left-0 z-50 group inset-y-0 xl:py-3.5 xl:pl-3.5 after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:xl:hidden [&.side-menu--mobile-menu-open]:ml-0 [&.side-menu--mobile-menu-open]:after:block -ml-[275px] after:hidden">
        <div className="close-mobile-menu fixed ml-[275px] w-10 h-10 items-center justify-center xl:hidden z-50 [&.close-mobile-menu--mobile-menu-open]:flex hidden">
          <a className="ml-5 mt-5" href="">
            <i
              data-tw-merge=""
              data-lucide="x"
              className="stroke-[1] h-8 w-8 text-white"
            ></i>
          </a>
        </div>
        <div className="side-menu__content h-full box bg-white/[0.95] rounded-none xl:rounded-xl z-20 relative w-[275px] duration-300 transition-[width] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] overflow-hidden flex flex-col">
          <div className="flex-none hidden xl:flex items-center z-10 px-5 h-[65px] w-[275px] overflow-hidden relative duration-300 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px]">
            <Link
              to={"/admin/dashboard"}
              className="flex items-center transition-[margin] duration-300 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0 group-[.side-menu--collapsed]:xl:ml-2"
              
            >
              <img
                src="/assets/images/logo/logo1.jpg"
                className="dashboard_logo"
                alt="3CHAPS"
              />
              <div className="ml-3.5 font-medium transition-opacity group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0">
                Ace Petroluxe
              </div>
            </Link>
            <a
              className="toggle-compact-menu ml-auto hidden h-[20px] w-[20px] items-center justify-center rounded-full border border-slate-600/40 transition-[opacity,transform] hover:bg-slate-600/5 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0 3xl:flex"
              href={"/admin/dashboard"}
            >
              <i
                data-tw-merge=""
                data-lucide="arrow-left"
                className="h-3.5 w-3.5 stroke-[1.3]"
              ></i>
            </a>
          </div>
          <div className="scrollable-ref w-full h-full z-20 px-5 overflow-y-auto overflow-x-hidden pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent [&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30">
            <ul className="scrollable">
              <li className="side-menu__divider">DASHBOARDS</li>
              <li>
                <a
                  href={"/admin/dashboard"}
                  className="side-menu__link side-menu__link--active "
                >
                  <i
                    data-tw-merge=""
                    data-lucide="gauge-circle"
                    className="stroke-[1] w-5 h-5 side-menu__link__icon"
                  ></i>
                  <div className="side-menu__link__title">Analytics</div>
                </a>
              </li>
              <li className="side-menu__divider">PEOPLE</li>
              <li>
                <a href={"/admin/users"} className="side-menu__link ">
                  <i
                    data-tw-merge=""
                    data-lucide="user-check"
                    className="stroke-[1] w-5 h-5 side-menu__link__icon"
                  ></i>
                  <div className="side-menu__link__title">Users</div>
                  <div className="side-menu__link__badge">4</div>
                </a>
              </li>
              <li>
                <a href={"/admin/vendors"} className="side-menu__link ">
                  <i
                    data-tw-merge=""
                    data-lucide="user"
                    className="stroke-[1] w-5 h-5 side-menu__link__icon"
                  ></i>
                  <div className="side-menu__link__title">Vendors</div>
                  <div className="side-menu__link__badge">4</div>
                </a>
              </li>
              <li>
                <a href={"/admin/customers"} className="side-menu__link ">
                  <i
                    data-tw-merge=""
                    data-lucide="user"
                    className="stroke-[1] w-5 h-5 side-menu__link__icon"
                  ></i>
                  <div className="side-menu__link__title">Customers</div>
                  <div className="side-menu__link__badge">4</div>
                </a>
              </li>
              <li className="side-menu__divider">PURCHASE ORDERS</li>
              <li>
                <a href={"/admin/purchase-orders"} className="side-menu__link ">
                  <i
                    data-tw-merge=""
                    data-lucide="alarm-clock"
                    className="stroke-[1] w-5 h-5 side-menu__link__icon"
                  ></i>
                  <div className="side-menu__link__title">Orders</div>
                  <div className="side-menu__link__badge">4</div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="fixed inset-x-0 top-0 mt-3.5 h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px]">
          <div className="top-bar absolute left-0 xl:left-3.5 right-0 h-full mx-5 group before:content-[''] before:absolute before:top-0 before:inset-x-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur">
            <div className="box group-[.top-bar--active]:box container flex h-full w-full items-center border-transparent bg-transparent shadow-none transition-[padding,background-color,border-color] duration-300 ease-in-out group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:from-theme-1 group-[.top-bar--active]:to-theme-2 group-[.top-bar--active]:px-5">
              <div className="flex items-center gap-1 xl:hidden">
                <a
                  className="open-mobile-menu rounded-full p-2 text-white hover:bg-white/5"
                  href=""
                >
                  <i
                    data-tw-merge=""
                    data-lucide="align-justify"
                    className="stroke-[1] h-[18px] w-[18px]"
                  ></i>
                </a>
                <a
                  className="rounded-full p-2 text-white hover:bg-white/5"
                  data-tw-toggle="modal"
                  data-tw-target="#quick-search"
                >
                  <i
                    data-tw-merge=""
                    data-lucide="search"
                    className="stroke-[1] h-[18px] w-[18px]"
                  ></i>
                </a>
              </div>
              <nav
                aria-label="breadcrumb"
                className="flex hidden flex-1 xl:block"
              >
                <ol className="flex items-center text-theme-1 dark:text-slate-300 text-white/90">
                  <li className="">
                    <a href="">App</a>
                  </li>
                  <li className="relative ml-5 pl-0.5 before:content-[''] before:w-[14px] before:h-[14px] before:bg-chevron-white before:transform before:rotate-[-90deg] before:bg-[length:100%] before:-ml-[1.125rem] before:absolute before:my-auto before:inset-y-0 dark:before:bg-chevron-white">
                    <a href="">Dashboards</a>
                  </li>
                  <li className="relative ml-5 pl-0.5 before:content-[''] before:w-[14px] before:h-[14px] before:bg-chevron-white before:transform before:rotate-[-90deg] before:bg-[length:100%] before:-ml-[1.125rem] before:absolute before:my-auto before:inset-y-0 dark:before:bg-chevron-white text-white/70">
                    <a href="">Analytics</a>
                  </li>
                </ol>
              </nav>

              <div className="flex flex-1 items-center">
                <div className="ml-auto flex items-center gap-1">
                  <a
                    className="rounded-full p-2 text-white hover:bg-white/5"
                    data-tw-toggle="modal"
                    data-tw-target="#activities-panel"
                  >
                    <i
                      data-tw-merge=""
                      data-lucide="layout-grid"
                      className="stroke-[1] h-[18px] w-[18px]"
                    ></i>
                  </a>
                  <a
                    className="request-full-screen rounded-full p-2 text-white hover:bg-white/5"
                    href=""
                  >
                    <i
                      data-tw-merge=""
                      data-lucide="expand"
                      className="stroke-[1] h-[18px] w-[18px]"
                    ></i>
                  </a>
                  <a
                    className="rounded-full p-2 text-white hover:bg-white/5"
                    data-tw-toggle="modal"
                    data-tw-target="#notifications-panel"
                  >
                    <i
                      data-tw-merge=""
                      data-lucide="bell"
                      className="stroke-[1] h-[18px] w-[18px]"
                    ></i>
                  </a>
                </div>
                <div
                  data-tw-merge=""
                  data-tw-placement="bottom-end"
                  className="dropdown relative ml-5"
                >
                  <button
                    data-tw-toggle="dropdown"
                    aria-expanded="false"
                    className="cursor-pointer image-fit h-[36px] w-[36px] overflow-hidden rounded-full border-[3px] border-white/[0.15]"
                  >
                    <img
                      src="/assets/images/users/user7-50x50.jpg"
                      alt="Tailwise - Admin Dashboard Template"
                    />
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
                    <div
                      data-tw-merge=""
                      className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 mt-1 w-56"
                    >
                      <a
                        href="echo-settings-email-settings.html"
                        className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item"
                      >
                        <i
                          data-tw-merge=""
                          data-lucide="inbox"
                          className="stroke-[1] mr-2 h-4 w-4"
                        ></i>
                        Lock Screen
                      </a>
                      <a
                        href="echo-settings-security.html"
                        className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item"
                      >
                        <i
                          data-tw-merge=""
                          data-lucide="lock"
                          className="stroke-[1] mr-2 h-4 w-4"
                        ></i>
                        Reset Password
                      </a>
                      <div className="h-px my-2 -mx-2 bg-slate-200/60 dark:bg-darkmode-400"></div>
                      <a
                        href="echo-settings.html"
                        className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item"
                      >
                        <i
                          data-tw-merge=""
                          data-lucide="users"
                          className="stroke-[1] mr-2 h-4 w-4"
                        ></i>
                        Profile Info
                      </a>
                      <a
                        onClick={handleLogout}
                        className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400"
                      >
                        <i
                          data-tw-merge=""
                          data-lucide="power"
                          className="stroke-[1] mr-2 h-4 w-4"
                        ></i>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  data-tw-backdrop=""
                  aria-hidden="true"
                  tabIndex="-1"
                  id="notifications-panel"
                  className="modal group bg-gradient-to-b from-theme-1/50 via-theme-2/50 to-black/50 transition-[visibility,opacity] w-screen h-screen fixed left-0 top-0 [&:not(.show)]:duration-[0s,0.2s] [&:not(.show)]:delay-[0.2s,0s] [&:not(.show)]:invisible [&:not(.show)]:opacity-0 [&.show]:visible [&.show]:opacity-100 [&.show]:duration-[0s,0.4s]"
                >
                  <div
                    data-tw-merge=""
                    className="ml-auto h-screen flex flex-col bg-white relative shadow-md transition-[margin-right] duration-[0.6s] -mr-[100%] group-[.show]:mr-0 dark:bg-darkmode-600 sm:w-[460px] w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]"
                  >
                    <a
                      className="absolute inset-y-0 left-0 right-auto my-auto -ml-[60px] flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/5 text-white/90 transition-all hover:rotate-180 hover:scale-105 hover:bg-white/10 focus:outline-none sm:-ml-[105px] sm:h-14 sm:w-14"
                      data-tw-dismiss="modal"
                    >
                      <i
                        data-tw-merge=""
                        data-lucide="x"
                        className="stroke-[1] h-8 w-8"
                      ></i>
                    </a>
                    <div
                      data-tw-merge=""
                      className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-6 py-5"
                    >
                      <h2 className="mr-auto text-base font-medium">
                        Notifications
                      </h2>
                      <button
                        data-tw-merge=""
                        className="transition duration-200 border shadow-sm items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20 [&:hover:not(:disabled)]:dark:bg-darkmode-100/10 hidden sm:flex"
                      >
                        <i
                          data-tw-merge=""
                          data-lucide="shield-check"
                          className="stroke-[1] mr-2 h-4 w-4"
                        ></i>
                        Mark all as read
                      </button>
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

export default SideMenu;
