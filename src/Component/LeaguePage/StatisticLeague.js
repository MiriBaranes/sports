import React from "react";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import {getAllDataAboutLeagues} from "../../data/componentData";
import Statistic from "../DynamicComponenet/Statistic";
import Header from "../DynamicComponenet/Header";
import {findMinMax} from "../../data/apiFunc";

const HALF_GAME = 45;
const GOAL_FASTEST_STATISTIC = ["The fastest goal minute", "The latest goal minute"];
const GOAL_BY_HALF = ["First Half Goals : ", "Second Half Goals : "];
const GOAL_BY_ROUND = ["The round with the most goals", "The round with the fewest goals"];

function StatisticLeague(props) {

    const isEarlyGoal = (goal) => goal < HALF_GAME;

    function getHistoryOfScorer(history) {
        const goals = history.map(x => x.goals);
        let minute = [];
        goals.map(goals => goals.map(x => x.minute && minute.push(x.minute)));
        const min = Math.min(...minute);
        const max = Math.max(...minute);
        const firstHalf = minute.filter(isEarlyGoal).length;
        const secHalf = minute.length - firstHalf;
        return [{earlyGoal: min, latestGoal: max}, {firstHalf: firstHalf, secHalf: secHalf}];
    }

    const sum = (prev, cur) => {
        return prev + cur;
    }

    function getGoalsByRounds(round, list) {
        const roundList = list.filter(x => x.round === round);
        const goalsList = roundList.map(play => play.homeGoals + play.awayGoals);
        return goalsList.reduce(sum, 0);
    }

    function getNumbersOfGoalsByRound(list) {
        const allHistory = getAllDataAboutLeagues(list);
        const history = allHistory.historyLeague;
        const minMax = findMinMax("round", history);
        let min = {round: undefined, count: Math.pow(100, 10)};
        let max = {round: undefined, count: 0};
        for (let i = minMax.min; i <= minMax.max; i++) {
            const goals = getGoalsByRounds(i, history);
            if (goals < min.count) {
                min.round = i;
                min.count = goals;
            }
            if (goals > max.count) {
                max.round = i;
                max.count = goals;
            }
        }
        return {
            first: "Round : " + max.round + " With " + max.count + " Goals",
            sec: "Round: " + min.round + " With " + min.count + " Goals"
        }
    }

    const history = props.history;
    const goals = getHistoryOfScorer(history);
    const round = getNumbersOfGoalsByRound(history);
    const goalsTimeStatistic = goals[0];
    const halfStatistic = goals[1];
    return (
        <div>
            {
                props.loading ?
                    <LoadingComponent/> :
                    <div>
                        <Header header={" 📊 Statistic Of " + props.league.name + " League"}/>
                        <Statistic headers={GOAL_BY_HALF}
                                   object={halfStatistic}/>
                        <Statistic headers={GOAL_BY_ROUND} object={round}/>
                        <Statistic headers={GOAL_FASTEST_STATISTIC} object={goalsTimeStatistic}/>
                    </div>
            }
        </div>
    )

}
export default StatisticLeague;