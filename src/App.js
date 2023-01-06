
import React from "react";
import LeagueProvider from "./Component/LeaguePage/LeagueProvider";
import {Route, Routes} from "react-router-dom";

function App() {
    return <div>
        <div className="App">
            <Routes>
                <Route path={'*'} element={<LeagueProvider/>}/>
            </Routes>
        </div>
    </div>
}

export default App;