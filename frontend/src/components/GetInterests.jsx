import React, { useEffect, useState } from "react";
import { API_URL } from "../shared/constants";
import { Person } from "../shared/Person";

import "./GetInterests.css";
//const socket = require("socket.io-client")(API_URL);

export function GetInterests() {
    const [count, setCount] = useState(0);
    const [person, setPerson] = useState(new Person());
    const [stage, setStage] = useState(0);
    const [chat, setChat] = useState([]);
    const [text, setText] = useState("");
    useEffect(() => {
        setInterval(() => {
            fetch(`${API_URL}/chat`)
                .then(res => res.json())
                .then(data => setChat(data));
        }, 100)
    }, [])
    function next() {
        person.generateComparison();
        setStage(prev => prev + 1);
        fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => console.log(data));
        if (stage == 9) {
            fetch(`${API_URL}/login?name=${person.name}`, {method: "post" });
        }
    }
    return (
        <div style = {{display: "grid", width: "100vw", placeContent: "center"}}>

            <main>
                <div>
                    {stage == 0 ? 
                    <>
                    <h1> Enter your name: </h1>
                    <div>
                    <input placeholder = "Anonymous User"type = "text" value = {person.name} onChange = {(e) => {
                        person.name = e.target.value;
                        setCount(prev => prev + 1);
                    }} />
                    <br />
                    <button disabled = {person.name.length === 0} onClick = {next}> Next </button>
                   </div> 
                    </>:
                    stage < 10 ? <>
                    <h1> Pick the one you prefer </h1>
                    <button onClick = {() => {
                        person.choose(person.currentA);
                        next();
                    }}>
                        {person.currentA}
                    </button>
                    <button onClick = {() => {
                        person.choose(person.currentB);
                        next();
                    }}>
                        {person.currentB}
                    </button>
                    <br />
                    
                    </>:
                    <>
                    <div style = {{height: "30vh"}}>

                    {chat.map(message => (
                        <div>
                            {message.from}:
                            {message.body}
                        </div>
                    ))}
                    </div>
                    <input value = {text} onChange = {e => setText(e.target.value)} />
                    <button onClick = {() => fetch(`${API_URL}/send?from=${person.name}&body=${text}`, {method: "post"})}>
                        Send
                    </button>
                    </>}
                    <br />
                </div>
                
            </main>
        </div>
    )
}