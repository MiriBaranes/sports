
import axios from "axios";
import {sortByKey} from "./apiFunc";

export const BASE_URL = "https://app.seker.live/fm1/"

export function getIdFromPathname(fullPath) {
    const split = fullPath.split("/");
    return split[split.length - 1];
}

export function getAllDataAboutLeagues(historyLeague) {////לשלוח אי פי אי של היסטוריה וזה יעשה את כל העבודה לבד
    let data = [];
    let listOfTeams = [];
    historyLeague?.map((x) => data.push(getGameGoalsData(x, listOfTeams)));
    historyLeague.sort();
    sortLeagueByType(listOfTeams);
    return {historyLeague: data, listOfTeams: listOfTeams};
}

export function sortLeagueByType(relevantList) {
    sortByKey(relevantList, "name", 1)
    sortByKey(relevantList, "difference", 0);
    sortByKey(relevantList, "points", 0)
}

function makeAGoalObj(game) {
    return {
        round: game.round,
        homeId: game.homeTeam.id,
        home: game.homeTeam.name,
        homeGoals: 0,
        awayId: game.awayTeam.id,
        away: game.awayTeam.name,
        awayGoals: 0
    }
}

export async function getData(path) {
    const response = await axios.get(BASE_URL + path).catch(function (error) {
        console.log(error)

    });
    return response.data;
}


export function getGameGoalsData(game, listOfTeams) {
    let goal = makeAGoalObj(game);
    if (game.goals) {
        const homeGoals = getHomeOrAwayGoals(true, game.goals);
        const awayGoals = game.goals.length - homeGoals;
        goal.homeGoals = homeGoals;
        goal.awayGoals = awayGoals;
        addCounter(homeGoals, awayGoals, listOfTeams, game.homeTeam.id, game.homeTeam.name);
        addCounter(awayGoals, homeGoals, listOfTeams, game.awayTeam.id, game.awayTeam.name);
    }
    return goal;
}

export function addCounter(goalsCount, goalsAway, listOfTeamsCount, id, name) {
    let win = 0;
    let draw = 0;
    if (goalsCount > goalsAway) {
        win = 1;
    } else if (goalsCount === goalsAway) {
        draw = 1;
    }
    let home = listOfTeamsCount.filter(item => item.id === id);
    if (home.length === 1) {
        home[0].win += win;
        home[0].draw += draw
        home[0].totalGoals += goalsCount;
        home[0].totalGoalsLost += goalsAway;
        home[0].points += draw + win * 3;
        home[0].difference += goalsCount - goalsAway;
    } else {
        listOfTeamsCount.push(makeATeamObject(name, id, goalsCount, goalsAway, win, draw))
    }
}

export function makeATeamObject(name, id, goalsCount, goalsAway, win, draw) {
    return {
        name: name,
        id: id,
        totalGoals: goalsCount,
        totalGoalsLost: goalsAway,
        win: win,
        draw: draw,
        points: win * 3 + draw,
        difference: goalsCount - goalsAway
    }

}

export function getHomeOrAwayGoals(home, goals) {
    return goals.filter(x => x.home === home).length;
}