import { useState } from "react"

export function CreateTodo(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <input type='text' placeholder="title" onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            console.log(title);
        }} /><br /><br />
        <input type='text' placeholder="description" onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
            console.log(description);
        }} /><br /><br />

        <button onClick={() => {
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description,
                    completed: false
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(async (res) => {
                    props.getTodos();
                })
        }}>Add todo</button>
    </div>
}

