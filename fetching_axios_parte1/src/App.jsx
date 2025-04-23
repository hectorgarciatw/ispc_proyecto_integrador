import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((res) => {
            console.log(res.data);
        });
    }, []);

    return (
        <>
            <h1>Fetching con APIS</h1>
        </>
    );
}

export default App;
