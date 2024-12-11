const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const mongoUrl = "mongodb+srv://djdelfinado:admin@cluster0.olmfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });

     //user

const User = require('./userDetails');

app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        await User.create({
            username: username,
            password: password,
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

  app.post("/userlogin", async (req, res) => {

    const {username, password} = req.body;

    try{
        const user = await User.findOne({username, password});
        if(user) {
            res.send({status: "ok", data: "Login Successful"});
        } else{
            res.send({status: "error", data: "Invalid username or password"});
        }
    } catch(error){
        res.send({status: "error", data: error.message});
    }

         
  });

     //task  

  const Task = require('./task');

  app.post('/tasks', async (req, res) => {
    const { title, description, due_date, status } = req.body;
    try {
        const newTask = await Task.create({ 
            title, 
            description, 
            due_date, 
            status 
        });
        res.status(201).send({ status: 'ok', data: newTask });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send({ status: 'ok', data: tasks });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});


app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).send({ status: 'error', message: 'Task not found' });
        }
        res.send({ status: 'ok', data: updatedTask });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ status: 'error', message: 'Task not found' });
        }
        res.send({ status: 'ok', data: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});


app.listen(5001, () => {
    console.log("Node js server started");
});

