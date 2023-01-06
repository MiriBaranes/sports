import {mapByKeyPaths} from "../../data/apiFunc";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import PrintTableData from "../DynamicComponenet/PrintTableData";
import HistoryAndPlayers from "./HistoryAndPlayers";
import Header from "../DynamicComponenet/Header";
import {getAllDataAboutLeagues, getData} from "../../data/componentData";
import {
    KEYS_PLAYERS_MAP,
    MAIN_LEAGUE_TABLE_HEADERS,
    MAIN_LEAGUE_TABLE_KEYS,
    TEAMS_PAGE_API_PATH
} from "../../data/constData";
import React from "react";

function TopHeaders({name}) {
    return (
        <div>
            <Header header={name + " League Table"}/>
            <div className={"smallHeader"}>
                You can click on any teams to show more info
            </div>
        </div>
    )
}

class LeagueComponent extends React.Component {
    state = {
        history: [],
        nameOfChoiceGroup: "",
        listToRender: [],
        historyOfLeague: [],
        loadingData: true,
        groupHistory: [],
        groupPlayers: [],
    }


    async componentDidMount() {
        this.setState({
            loadingData: true
        })
        console.log(this.state.listToRender)
        await this.init();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.league.id != prevProps.league.id) {
            await this.init()
        }
    }

    async init() {
        const load = !this.props.history;
        if (!load) {
            const history = getAllDataAboutLeagues(this.props.history);
            this.setState({
                nameOfChoiceGroup: "",
                listToRender: history.listOfTeams,
                historyOfLeague: history.historyLeague,
                groupHistory: [],
                groupPlayers: [],
                loadingData: false
            })
        }
    }


    handelClick = async (dataItem) => {
        let groupPlayers = await getData(TEAMS_PAGE_API_PATH + this.props.league.id + "/" + dataItem.id);
        groupPlayers = mapByKeyPaths(groupPlayers, KEYS_PLAYERS_MAP);
        const history = this.state.historyOfLeague.filter(x => x.homeId == dataItem.id || x.awayId == dataItem.id);
        console.log(history)
        this.setState({
            groupHistory: history,
            groupPlayers: groupPlayers,
            nameOfChoiceGroup: dataItem
        })
    }

    render() {
        return (
            <div>
                {this.state.loadingData ?
                    <LoadingComponent></LoadingComponent> :
                    <div>
                        <TopHeaders name={this.props.league.name}/>
                        <PrintTableData data={this.state.listToRender}
                                        headers={MAIN_LEAGUE_TABLE_HEADERS}
                                        keys={MAIN_LEAGUE_TABLE_KEYS}
                                        handelClick={this.handelClick}
                                        type={true}></PrintTableData>
                        {this.state.nameOfChoiceGroup !== "" &&
                            <HistoryAndPlayers history={this.state.groupHistory}
                                               players={this.state.groupPlayers}
                                               group={this.state.nameOfChoiceGroup}/>}
                    </div>}

            </div>
        )
    }

}

export default LeagueComponent;