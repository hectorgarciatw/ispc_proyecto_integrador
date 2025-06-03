import axios from "axios";
import { useEffect, useState, useRef } from "react";

//Componentes
import Stats from "./components/Stats";

function App() {
    //Estados
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [page, setPage] = useState(1);
    const [format, setFormat] = useState("");

    //Referencias
    const containerRef = useRef(null);

    const limit = 30;

    useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`).then((res) => {
            setProducts(res.data.products);
        });
    }, [page]);

    //Filtramos los productos obtenidos de la API
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    {
        /* Constantes para las estadísticas */
    }
    const totalProducts = filteredProducts.length;
    {
        /* Spread operator */
    }
    const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    const minProduct = Math.min(...filteredProducts.map((p) => p.price));

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        containerRef.current.classList.toggle("dark-mode");
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "productos.json");
    };

    const triggerDownload = (url, filename) => {
        //crear el hipervinculo
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        //Agregamos el anchor tag en el DOM
        document.body.appendChild(link);
        //Simulas el click en el elemento
        link.click();
        //Eliminar el elemento anchor
        document.body.removeChild(link);
    };

    return (
        <div ref={containerRef}>
            <h1>Axios</h1>
            <button onClick={toggleDarkMode}>Modo {darkMode ? "Claro" : "Oscuro"}</button>
            <input
                type="text"
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            //Selección de formátos de descarga
            <select onChange={(e) => setFormat(e.target.value)} value={format}>
                <option value="">Seleccionar formáto</option>
                <option value="json">JSON</option>
            </select>
            <button onClick={handleExport}>Exportar archivo</button>
            <ul>
                {filteredProducts.map((p) => (
                    <li key={p.id}>
                        {p.title} {p.price}
                    </li>
                ))}
            </ul>
            <small>Estamos en la página {page}</small>
            <br />
            <button
                disabled={page === 1}
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                Página anterior
            </button>
            <button
                disabled={filteredProducts.length < 30}
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Página siguiente
            </button>
            <button onClick={() => setShow(!show)}>{show ? "Ocultar" : "Mostrar"}</button>
            {/* Renderización condicional */}
            {show && <Stats total={totalProducts} maximo={maxProduct} minimo={minProduct} />}
            {/* Renderización condicional */}
            {filteredProducts.length === 0 && <div>No se encontraron productos</div>}
        </div>
    );
}

export default App;
