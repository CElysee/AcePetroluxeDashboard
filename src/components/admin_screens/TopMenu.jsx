import React from "react";

function TopMenu() {
  return (
    <>
      <div>
        <div
          data-tw-backdrop=""
          aria-hidden="true"
          tabIndex="-1"
          id="theme-switcher"
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
                className="stroke-[1] h-3 w-3 sm:h-8 sm:w-8"
              ></i>
            </a>
          </div>
        </div>
        <div
          className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-1 text-white shadow-lg"
          data-tw-toggle="modal"
          data-tw-target="#theme-switcher"
        >
          <i
            data-tw-merge=""
            data-lucide="settings"
            className="stroke-[1] w-5 h-5 animate-spin"
          ></i>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
