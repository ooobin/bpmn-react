export default function searchBar() {
    return (
        <form>
            <input type="text" placeholder="Search..." />
            <br />
            <label>
                <input type="checkbox" />
                <span id="checkbox-product">Only show products in stock</span>
            </label>
        </form>
    );
}

function productTable({ products }) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {

    })
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
