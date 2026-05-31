
import type {  JSX } from 'react'
import { NavLink } from 'react-router'

type Props = {
    link: string
    title:string
    icon:JSX.Element
}

export const NavigationMenu = (props: Props) => {
  return (
        <li>
              <NavLink to={props.link}>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right cursor-pointer"
                data-tip= {props.title}
              >
                {props.icon}
                <span className="is-drawer-close:hidden pl-1">
                  {props.title}
                </span>
              </button>
              </NavLink>
     </li>
  )
}