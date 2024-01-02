import React from "react";
import './App.css'
import Users from "./components/Users.jsx";

function App() {
    return (
        <div className={"container"}>
            <Users key={"usersComp"} />
        </div>
    )
}

export default App
