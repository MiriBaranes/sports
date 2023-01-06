import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {
    ALL_NAV_LINK_LEAGUE,
    BAR_CLASS_NAME,
    NAV_LINK_CLASS_NAME,
    NAV_LINK_STYLE,
} from "../../data/constData";
import {getIdFromPathname} from "../../data/componentData";


function LeagueMain() {
    const id = getIdFromPathname(window.location.pathname)
    return <div>
        <nav className={BAR_CLASS_NAME}>
            {ALL_NAV_LINK_LEAGUE.map((nav, key) => {
                    return (<NavLink key={key} style={NAV_LINK_STYLE} to={nav.key + id}
                                     className={NAV_LINK_CLASS_NAME}>{nav.value}</NavLink>)
                }
            )}
        </nav>
        <Outlet/>
    </div>
}

export default LeagueMain;