import {BAR_CLASS_NAME, NAV_LINK_CLASS_NAME, NAV_LINK_STYLE} from "../../data/constData";
import {NavLink, Outlet} from "react-router-dom";
import React from "react";

function NavLinkMain(props) {
    return <>
        <nav className={BAR_CLASS_NAME}>
            <NavLink style={NAV_LINK_STYLE} to={"/"}
                     className={NAV_LINK_CLASS_NAME}
                     onClick={props.onClick}>Home</NavLink>
            {props.leagues.map(props.callbackfn)}
        </nav>
        <Outlet/>
    </>;
}
export default NavLinkMain;