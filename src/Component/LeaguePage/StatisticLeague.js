
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

class StatisticLeague extends React.Component {
    state = {
        loading: true,
        id: 0,
        halfStatistic: {},
        goalsTimeStatistic: {},
        goalsRoundsStatistic: {}
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await this.init();
    }

    isEarlyGoal = (goal) => goal < HALF_GAME;

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.league.id !== prevProps.league.id) {
            await this.init()
        }
    }

    init = async () => {
        const history = await this.props.history;
        const goals = this.getHistoryOfScorer(history);
        const round = this.getNumbersOfGoalsByRound(history);
        this.setState({
            goalsTimeStatistic: goals[0],
            halfStatistic: goals[1],
            goalsRoundsStatistic: round,
            loading: false
        })
    }

    getHistoryOfScorer(history) {
        const goals = history.map(x => x.goals);
        let minute = [];
        goals.map(goals => goals.map(x => x.minute && minute.push(x.minute)));
        const min = Math.min(...minute);
        const max = Math.max(...minute);
        const firstHalf = minute.filter(this.isEarlyGoal).length;
        const secHalf = minute.length - firstHalf;
        return [{earlyGoal: min, latestGoal: max}, {firstHalf: firstHalf, secHalf: secHalf}];
    }

    sum = (prev, cur) => {
        return prev + cur;
    }

    getGoalsByRounds(round, list) {
        const roundList = list.filter(x => x.round === round);
        const goalsList = roundList.map(play => play.homeGoals + play.awayGoals);
        return goalsList.reduce(this.sum, 0);
    }

    getNumbersOfGoalsByRound(list) {
        const allHistory = getAllDataAboutLeagues(list);
        const history = allHistory.historyLeague;
        const minMax = findMinMax("round", history);
        let min = {round: undefined, count: Math.pow(100, 10)};
        let max = {round: undefined, count: 0};
        for (let i = minMax.min; i <= minMax.max; i++) {
            const goals = this.getGoalsByRounds(i, history);
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

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                        <LoadingComponent/> :
                        <div>
                            <Header header={" 📊 Statistic Of " +this.props.league.name+ " League"}/>
                            <Statistic headers={GOAL_BY_HALF}
                                       object={this.state.halfStatistic}/>
                            <Statistic headers={GOAL_BY_ROUND} object={this.state.goalsRoundsStatistic}/>
                            <Statistic headers={GOAL_FASTEST_STATISTIC} object={this.state.goalsTimeStatistic}/>
                        </div>
                }
            </div>
        )
    }
}

export default StatisticLeague;