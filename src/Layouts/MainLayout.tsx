import { NavLink } from "react-router";
import { NavigationMenu } from "../Components/NavigationMenu";
import { getImage } from "../Helpers/ImageHelper";
import Navbar from "./Navbar";


type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  console.log(getImage("ragnaroktheneworldhead.png"))
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
    <Navbar/>
        <div className="min-h-screen p-5 md:p-6">{children}</div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <NavLink to="/row/" >
              <li>
                <div
                  className={`is-drawer-close:tooltip   is-drawer-close:tooltip-right min-h-[4em]  `}
                    style={{
                    backgroundImage: `url(${getImage("ragnaroktheneworldhead.png")})`,
                  }}
                >
                </div>
                
              </li>
            </NavLink>
            <div className="bg-black text-center is-drawer-close:hidden cursor-default">
                Ragnarok: The New World
            </div>
            <br />
            <NavigationMenu
              title="Life Job Calculator"
              link="/row/CraftingCalculator"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="my-1.5 inline-block size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                  />
                </svg>
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
