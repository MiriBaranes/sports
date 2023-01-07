import {Route, Routes} from "react-router-dom";
import LeagueMain from "./LeagueMain";
import {BEST_PLAYERS_PATH, HISTORY_PATH, LEAGUE_PATH, STATISTIC_PATH} from "../../data/constData";
import LeagueComponent from "./LeagueComponent";
import HistoryForAllLeague from "./HistoryForAllLeague";
import TheBestsPlayers from "./TheBestsPlayers";
import StatisticLeague from "./StatisticLeague";
import React from "react";

function RouteComponent(props) {
    return <Routes>
        <Route
            element={<LeagueMain state={props.state}/>}>
            <Route path={LEAGUE_PATH + ":id"}
                   element={<LeagueComponent history={props.history} league={props.league}/>}/>
            <Route path={HISTORY_PATH + ":id"}
                   element={<HistoryForAllLeague history={props.history} league={props.league}/>}/>
            <Route path={BEST_PLAYERS_PATH + ":id"}
                   element={<TheBestsPlayers loading={props.state.loadingHistory} history={props.history} league={props.league}/>}/>
            <Route path={STATISTIC_PATH + ":id"}
                   element={<StatisticLeague loading={props.state.loadingHistory} history={props.history} league={props.league}/>}/>
        </Route>
    </Routes>;
}
export default RouteComponent;
