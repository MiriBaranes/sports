import Header from "../DynamicComponenet/Header";
import {getCountByKey, getTopN, mapByKeyPaths} from "../../data/apiFunc";
import React from "react";
import LoadingComponent from "../DynamicComponenet/LoadingComponent";
import PrintTableData from "../DynamicComponenet/PrintTableData";
const BEST_PLAYERS_KEYS=['number', 'firstName', 'lastName', 'count'];
const BES_PLAYERS_HEADERS= ["Place", "First Name", "Last Name", "Number Of Goals"];


function  TheBestsPlayers(props){
    const theBest= ()=> {
        const all_goals = mapByKeyPaths(props.history, [["goals"]]).map(x => x.goals).filter(Boolean);
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
    return (
        <div>
            {props.loading ? <LoadingComponent/> :
                <div>
                    <Header header={"The Best Player For " + props.league.name+" League "}/>
                    <PrintTableData data={theBest()}
                                    headers={BES_PLAYERS_HEADERS}
                                    keys={BEST_PLAYERS_KEYS}
                                    type={false}/>
                </div>
            }
        </div>
    )
}


export default TheBestsPlayers;