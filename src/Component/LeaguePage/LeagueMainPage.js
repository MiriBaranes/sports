import React from "react";
import {getData, getIdFromPathname} from "../../data/componentData";
import {
    HISTORY_PATH,
    LEAGUE_PATH,
    MAIN_PATH,
    NAV_LINK_CLASS_NAME
} from "../../data/constData";
import {NavLink} from "react-router-dom";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import Header from "../DynamicComponenet/Header";
import RouteComponent from "./RouteComponent";
import NavLinkMain from "./NavLinkMain";

const navActive = (id) => window.location.pathname.charAt(window.location.pathname.length - 1) == id ? {
    backgroundColor: "black"
} : undefined;

class LeagueMainPage extends React.Component {
    state = {
        league: {},
        history: [],
        leagues: [],
        loading: true,
        loadingHistory: false
    }

    async componentDidMount() {
        await this.getAllData();
        await this.setLocation();
        this.setState({
            loading: false
        })
    }

    getAllData = async () => {
        const data = await getData(MAIN_PATH)
        this.setState({
            leagues: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.league.id != this.state.league.id) {
            await this.setLocation();
        }
    }

    changeData = async (obj) => {
        await getData(HISTORY_PATH + obj.id).then(data => {
            this.setState({
                history: data,
                league: obj,
                loadingHistory: false
            })
        })
    }


    setLocation = async () => {
        const id = getIdFromPathname(window.location.pathname);
        const object = this.state.leagues.find(x => x.id == id);
        if (object == undefined || object == "") {
            this.setState({
                history: [],
                league: {},
                loading: false
            })
        } else {
            this.setState({
                loadingHistory: true
            })
            await this.changeData(object);
        }


    }

    callback = (item, key) => {
        return <NavLink style={navActive(item.id)}
                        className={NAV_LINK_CLASS_NAME} key={key} to={LEAGUE_PATH + item.id}
                        onClick={() => this.changeData(item)}>{item.name}</NavLink>
    };


    render() {
        return (
            <div>
                <Header header={"Leagues Web 🔝"}/>
                {
                    this.state.loading ?
                        <LoadingComponent/> :
                        <div>
                            <NavLinkMain onClick={() => this.setLocation()} leagues={this.state.leagues}
                                         callbackfn={(nav, index) => this.callback(nav, index)}/>
                        </div>
                }
                <RouteComponent state={this.state} history={this.state.history} league={this.state.league}/>
            </div>
        )
    }
}

export default LeagueMainPage;