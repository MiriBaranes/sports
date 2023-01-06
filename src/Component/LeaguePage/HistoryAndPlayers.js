import Header from "../DynamicComponenet/Header";
import {
    HISTORY_TABLE_HEADERS,
    HISTORY_TABLE_KEYS,
    PLAYER_TABLE_KEYS,
    PLAYERS_TABLE_HEADERS
} from "../../data/constData";
import ListOfObjectByKeysAndHeaders from "../DynamicComponenet/ListOfObjectByKeysAndHeaders";

function HistoryAndPlayers({history, players, group}) {
    return (
        <div>
            <Header header={group.name + " Group Players And History Games"}></Header>
            <ListOfObjectByKeysAndHeaders list={players} header={group.name + " Players : "}
                                          tableKey={PLAYER_TABLE_KEYS} tableHeaders={PLAYERS_TABLE_HEADERS}/>
            <ListOfObjectByKeysAndHeaders list={history} header={group.name + " History : "}
                                          tableKey={HISTORY_TABLE_KEYS} tableHeaders={HISTORY_TABLE_HEADERS}/>

        </div>
    )
}

export default HistoryAndPlayers;