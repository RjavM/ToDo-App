
export function Todos(props) {
    return <div>
        {props.todos.map(todo => {
            return <div>
                <h2>Title: {todo.title}</h2>
                <h2>Description: {todo.description}</h2>
                {todo.completed ? (
                    <span>Completed</span>
                ) : (
                    <button onClick={() => {
                        fetch("http://localhost:3000/completed", {
                            method: "PUT",
                            body: JSON.stringify({
                                id: todo._id
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        }).then(async (res) => {
                            props.getTodos();
                        });
                    }}>Mark as completed</button>
                )} <br></br><br></br>
                <button onClick={() => {
                    fetch("http://localhost:3000/completed", {
                        method: "DELETE",
                        body: JSON.stringify({
                            id: todo._id
                        }),
                        headers: {
                            "content-type": "application/json"
                        }
                    }).then(async (res) => {
                        props.getTodos();
                    });
                }}>Delete Todo</button>
            </div>
        })}
    </div>
}