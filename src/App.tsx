import React from 'react';
import './App.css';
import MultiSelect from "./components/multi-select";

function App() {
    return (
        <div className="App" style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20
        }}>
            <MultiSelect/>
        </div>
    );
}

export default App;
