import { useState } from "react";

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        alert("You clicked me! && " + count + " times");
    }

    return <button onClick={handleClick}>Click me</button>;
}

export default function MyApp() {
    return (
        <div>
            <h1>Welcome to my app</h1>
            <MyButton />
        </div>
    );
}
