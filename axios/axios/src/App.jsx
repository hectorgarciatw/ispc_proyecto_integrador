import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((res) => {
            setProducts(res.data);
        });
    }, []);

    //Filtramos los productos obtenidos de la API
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <h1>Axios</h1>

            <input
                type="text"
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />

            <ul>
                {filteredProducts.map((p) => (
                    <li key={p.id}>
                        {p.title} {p.price}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
