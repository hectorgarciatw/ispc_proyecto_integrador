import axios from "axios";
import { useEffect, useState } from "react";
//Importamos componentes propios
import Stats from "./components/Stats";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    //Filtramos los productos obtenidos de la API
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    //Cantidad de productos en pantalla
    const totalProducts = filteredProducts.length;

    //El precio más caro
    const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    //El precio más barato
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

            <button onClick={() => setShow(!show)}>{show ? "Ocultar" : "Mostrar"}</button>

            {/* Renderización condicional */}
            {show && <Stats total={totalProducts} max={maxProduct} min={minProduct} />}
            {filteredProducts.length == 0 && <div>No se encontraron productos</div>}
        </>
    );
}

export default App;
