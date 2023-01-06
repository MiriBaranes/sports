export const MAIN_PATH = "/leagues/";
export const LEAGUE_PATH = "/league/";
export const STATISTIC_PATH = "/statistic/";
export const HISTORY_PATH = "/history/";
export const BEST_PLAYERS_PATH = "/bestPlayers/";
export const BAR_CLASS_NAME= "icon-bar";
export const NAV_LINK_CLASS_NAME= "active";
export const HOME_PAGE="/";
export const HISTORY ="history/";
export const TEAM_PATH = "teams/";
export const HOME_PAGE_PATH ="/homePage"
export const TEAMS_PAGE_API_PATH = "squad/";

export const KEYS_PLAYERS_MAP = [["firstName"], ["lastName"]];
export const HISTORY_TABLE_HEADERS = ["Home Team", "Home goals", "Away Goals", "Away Team"];
export const HISTORY_TABLE_KEYS = ["home","homeGoals","awayGoals","away"];
export const PLAYER_TABLE_KEYS = ["firstName", "lastName"];
export const PLAYERS_TABLE_HEADERS = ["Player First Name", "Player Last Name"];
export const MAIN_LEAGUE_TABLE_HEADERS= ["Group Name", "Points Group", "Difference Goals Group"];
export const MAIN_LEAGUE_TABLE_KEYS=["name", "points", "difference"];
export const HISTORY_ALL_LEAGUE_TABLE= ["home","homeGoals","awayGoals","away","round"]




export const NAV_LINK_STYLE = ({isActive}) => isActive ? {
    backgroundColor: "black"
} : undefined
export const ALL_NAV_LINK_LEAGUE = [{key: "/league/", value: "Table League"}, {key: "/history/", value: "History"}
    , {key: "/bestPlayers/", value: "Best Players"}, {key: "/statistic/", value: "Statistic"}];