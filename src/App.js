import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ListTask from "./components/list-task/ListTask";
import s from './App.module.css';

function App() {
    return (
        <div className={s.container}>
            <Header/>
            <ListTask/>
            <Footer/>
        </div>
    )
}

export default App;