import './App.css';
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";
import EditContact from "./containers/ContactEdit/ContactEdit.tsx";

const App = () => {
    return (
        <>
            <header className="mb-5">
                <Toolbar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/newContact" element={<NewContact />} />
                    <Route path="/edit/:idContact" element={<EditContact />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
