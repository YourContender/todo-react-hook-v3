import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ListTask from "./components/list-task/ListTask";
import { useState } from "react";
import s from './App.module.css';

function App() {
    const [add, setAdd] = useState(false);

    return (
        <div className={s.container}>
            <Header add={add} setAdd={setAdd}/>
            <ListTask add={add}/>
            <Footer/>
        </div>
    )
}

export default App;