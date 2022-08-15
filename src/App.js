import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ListTask from "./components/list-task/ListTask";
import { useState } from "react";
import s from './App.module.css';

function App() {
    const [showFormPanel, setShowFormPanel] = useState(false);

    return (
        <div className={s.container}>
            <Header showFormPanel={showFormPanel} setShowFormPanel={setShowFormPanel} />
            <ListTask showFormPanel={showFormPanel} setShowFormPanel={setShowFormPanel}/>
            <Footer/>
        </div>
    )
}

export default App;