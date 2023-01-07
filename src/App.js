import React from "react";
import LeagueMainPage from "./Component/LeaguePage/LeagueMainPage";
import {Route, Routes} from "react-router-dom";

function App() {
    return <div>
        <div className="App">
            <Routes>
                <Route path={'/*'} element={<LeagueMainPage/>}/>
            </Routes>
        </div>
    </div>
}

export default App;