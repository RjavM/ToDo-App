const express = require("express");
const cors = require("cors");
const app = express();
const { createTodo } = require("./types");
const { updateTodo } = require("./types");
const { tododb } = require("./database");
const { todo } = require("./database");
app.use(express.json());
app.use(cors());



app.post("/todo", async(req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Incorrect inputs to title or description!"
        })
        return;
    }
    //else put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({
        msg: "Todo created"
    });
})

app.get("/todo", async(req, res) => {
    //get all todos from mongodb
    const allTodos = await todo.find({});
    res.json({
        Todos: allTodos
    })
})

app.put("/completed", async(req, res) => {
    const updatedPayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatedPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "No such todo exists"
        });
    }
    //else update todo in mongodb
    await todo.updateOne({
        _id: updatedPayload.id
    }, {
        completed: true
    });

    res.json({
        msg: "Todo marked as completed"
    });
})

app.delete("/completed", async(req, res) => {
    const updatedPayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatedPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "No such todo exists"
        });
    }
    //else update todo in mongodb
    await todo.deleteOne({
        _id: updatedPayload.id
    });

    res.json({
        msg: "Todo deleted after 2 seconds"
    });
})

const port = 3000;
app.listen(port, () => {
    console.log(`Your app is running on port number: ${port}`);
})