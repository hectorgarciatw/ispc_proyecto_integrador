import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products?limit=3").then((res) => {
            setProducts(res.data);
        });
    }, []);

    return (
        <>
            <h1>Axios</h1>

            <ul>
                {products.map((p) => (
                    <li key={p.id}>{p.title}</li>
                ))}
            </ul>
        </>
    );
}

export default App;
