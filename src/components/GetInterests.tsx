import React, { useState } from "react";
import { Person } from "../shared/Person.ts";

import "./GetInterests.css";

export function GetInterests() {
    const [count, setCount] = useState(0);
    const [person, setPerson] = useState(new Person());
    const [stage, setStage] = useState(0);
    function next() {
        person.generateComparison();
        setStage(prev => prev + 1);
        
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
                    <h1> Pairing you up... </h1>
                    <p> We're analyzing your interests and that of others currently online and deciding who is the best match for you. </p>
                    </>}
                    <br />
                </div>
                
            </main>
        </div>
    )
}