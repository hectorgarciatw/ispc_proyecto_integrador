import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=100").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    //Filtramos los productos obtenidos de la API
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    {
        /* Constantes para estadísticas */
    }
    const totalProducts = filteredProducts.length;
    {
        /* Spread operator */
    }
    const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    const minProduct = Math.min(...filteredProducts.map((p) => p.price));

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

            <div>
                <h2>Estadísticas</h2>
                <p>Productos totales: {totalProducts} productos</p>
                <p>Precio máximo: {maxProduct}</p>
                <p>Precio mínimo: {minProduct}</p>
            </div>

            {/* Renderización condicional */}
            {filteredProducts.length === 0 && <div>No se encontraron productos</div>}
        </>
    );
}

export default App;
