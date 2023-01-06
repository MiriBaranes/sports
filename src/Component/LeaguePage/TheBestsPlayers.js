import Header from "../DynamicComponenet/Header";
import {getCountByKey, getTopN, mapByKeyPaths} from "../../data/apiFunc";
import React from "react";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import PrintTableData from "../DynamicComponenet/PrintTableData";


class TheBestsPlayers extends React.Component {
    state = {
        bestPlayers: [],
        id: 0,
        loading: true
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await this.init();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.league.id !== this.props.league.id) {
            await this.init()
        }
    }

    init = async () => {
        const history = await this.props.history;
        const theBest = this.theBestPlayerInLeague(history);
        this.setState({
            bestPlayers: theBest,
            loading: false
        })
    }

    theBestPlayerInLeague(history) {
        const all_goals = mapByKeyPaths(history, [["goals"]]).map(x => x.goals).filter(Boolean);
        let all_scorers = [];
        for (const goals of all_goals) {
            const scorers = goals.map(x => x.scorer).map(x => {
                return {firstName: x.firstName, lastName: x.lastName, id: x.id}
            }).filter(Boolean);
            all_scorers.push(...scorers);
        }
        all_scorers = getCountByKey(all_scorers);
        let clean = all_scorers.filter((arr, index, self) =>
            index === self.findIndex((t) => (t.id === arr.id)))
        let theBest = [];
        let topScorers = getTopN(clean, "count", 3);
        topScorers.forEach(function (item, index) {
            theBest.push({
                number: "💯  Place->  "+(index+1),
                firstName: item.firstName,
                lastName: item.lastName,
                count: "🏆 "+ item.count + " 🏆"
            })
        });
        return theBest;
    }

    render() {
        return (
            <div>
                {this.state.loading ? <LoadingComponent/> :
                    <div>
                        <Header header={"The Best Player For " + this.props.league.name+" League "}/>
                        <PrintTableData data={this.state.bestPlayers}
                                        headers={["Place", "First Name", "Last Name", "Number Of Goals"]}
                                        keys={Object.keys(this.state.bestPlayers[0])}
                        type={false}/>
                    </div>
                }
            </div>
        )
    }
}

export default TheBestsPlayers;