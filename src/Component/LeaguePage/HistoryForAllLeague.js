
import PrintTableData from "../DynamicComponenet/PrintTableData";
import React from "react";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import FilterMinMax from "../DynamicComponenet/FilterMinMax";
import Header from "../DynamicComponenet/Header";
import {getAllDataAboutLeagues} from "../../data/componentData";
import {HISTORY_ALL_LEAGUE_TABLE} from "../../data/constData";
import {findMinMax} from "../../data/apiFunc";

const HISTORY_TABLE_HEADER = ["Home Team", "Home Goals", "Away Goals", "Away Team", "Game Round"]


class HistoryForAllLeague extends React.Component {
    state = {
        list: [],
        loadingData: true,
        min: 0,
        max: 0,
        userInputMin: 1,
        userInputMax: 0
    }

    async componentDidMount() {
        this.setState({
            loadingData: true
        })
        await this.init();

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.league.id !== this.props.league.id) {
            await this.init()
        }
    }

    async init() {
        const history = await this.props.history;
        const objectData = this.dataFunction(history);
        this.setState({
            min: objectData.minMax.min,
            max: objectData.minMax.max,
            userInputMax: objectData.minMax.max,
            list: objectData.data,
            loadingData: false
        })
    }

    dataFunction(list) {
        const allHistory = getAllDataAboutLeagues(list);
        const history = allHistory.historyLeague;
        return {data: history, minMax: findMinMax(["round"], history)}
    }


    filter = () => {
        const all = this.state.list;
        return all.filter((item) => {
            return (item.round >= this.state.userInputMin && item.round <= this.state.userInputMax);
        });
    }
    validateFilter = (number, type) => {
        let valid = false;
        if (number >= 1) {
            if (type === "min") {
                valid = (number <= this.state.userInputMax)
            } else {
                valid = (number >= this.state.userInputMin && number <= this.state.max);
            }
        }
        return valid;
    }
    changeMinFilter = (event) => {
        const min = event.target.value;
        this.changeStateMinOrMax("min", "userInputMin", min)
    }
    changeStateMinOrMax = (type, keyToChange, value) => {
        if (this.validateFilter(parseInt(value), type)) {
            this.setState({
                [keyToChange]: value
            })
        } else {
            alert("not valid!")
        }
    }
    changeMaxFilter = (event) => {
        const max = event.target.value;
        this.changeStateMinOrMax("max", "userInputMax", max)
    }

    render() {
        return (
            <div>
                {this.state.loadingData ? <LoadingComponent/> :
                    <div>
                        <Header header={"History "+ this.props.league.name +" League page"}></Header>
                        <div>
                            <FilterMinMax minValue={this.state.userInputMin} minValidValue={this.state.min}
                                          maxValue={this.state.userInputMax}
                                          maxValidValue={this.state.max}
                                          name={"Round"} changeMax={this.changeMaxFilter}
                                          changeMin={this.changeMinFilter}>
                            </FilterMinMax>
                            <PrintTableData headers={HISTORY_TABLE_HEADER} keys={HISTORY_ALL_LEAGUE_TABLE}
                                            data={this.filter()}
                            type={false}/>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default HistoryForAllLeague;