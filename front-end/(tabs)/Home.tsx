import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';  

export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);


    const handleUpdateTask = (taskId: string) => {

        if (!taskToUpdate) return;  

        const taskData = {
            title: title,
            description: description,
            due_date: dueDate,  
        };
    
        axios.put(`http://192.168.1.5:5001/tasks/${taskToUpdate._id}`, taskData)
            .then(response => {
                console.log('Task updated:', response.data);
                setTitle('');
                setDescription('');
                setDueDate('');
                fetchTasks();  
                alert("Task Updated");
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };
    
    const openUpdateModal = (task) => {
        setTaskToUpdate(task);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
        setModalVisible(true);
    };

   
    const closeModal = () => {
        setModalVisible(false);
        setTitle('');
        setDescription('');
        setDueDate('');
    };

     const fetchTasks = () =>{

        axios.get('http://192.168.1.5:5001/tasks')
        .then(response => {
            console.log('Tasks fetched: ', response.data);
            setTasks(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching Tasks: ',error);
        });
     };

    const handleAddTask = () => {
       

        const taskData = {
            title: title,
            description: description,
            due_date: dueDate,  
        };

        
        axios.post('http://192.168.1.5:5001/tasks', taskData)
            .then(response => {
                alert("Task Added");
                console.log('Task added:', response.data);
                setTitle('');
                setDescription('');
                setDueDate('');
                fetchTasks();

            })
            .catch(error => {
                alert("There is some error adding task");
                console.error('Error adding task:', error);
                
            });
    };

      const handleDeleteTask = (taskId) => {
        axios.delete(`http://192.168.1.5:5001/tasks/${taskId}`)
            .then(response => {
                console.log('Task deleted:', response.data);
                fetchTasks();
                alert("Task Deleted");
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });

           
    };
    
    const confirmDeleteTask = (taskId: string) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteTask(taskId), style: "destructive" }
            ]
        );
    };

       useEffect(() => {
      fetchTasks();

       }, []);

         const renderItem = ({item}: {item: any}) => (

         
            <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due Date: {item.due_date}</Text>
            
 <Text style={styles.space}></Text>

            <View style = {styles.modalButtons}>
            <TouchableOpacity
            style={styles.updateButton}
            onPress={() => openUpdateModal(item)} 
        >
            <Text style={{ textAlign: 'center', color: "white" ,marginTop: 5}}>Update Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red', marginTop: 5, width: '40%' }]}
            onPress={() => confirmDeleteTask(item._id)}
        >
            <Text style={{ textAlign: 'center', color: "white" }}>Delete Task</Text>
        </TouchableOpacity>
        </View>
        </View>
             
         )

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Today's Task</Text>
            <Text style={styles.space}></Text>

            <TextInput
                placeholder="Title"
                onChangeText={setTitle}
                value={title}
            />
            <TextInput
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
            />
            <TextInput
                placeholder="Due Date (MM/DD/YYYY HH:mm AM/PM)"
                onChangeText={setDueDate}
                value={dueDate}
            />
        
            <Text style={styles.space}></Text>

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={{ textAlign: 'center', color: "white" }}>Add Task</Text>
            </TouchableOpacity>

          

            <Text style={styles.header1}>Tasks List</Text>
            <Text style ={styles.space}></Text>
          
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item._id} 
            />

<Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                 <Text style= {{fontWeight: 'bold', fontSize: 20}}>Edit Task</Text>
                 <Text style ={styles.space}></Text>
                 <Text style= {{fontWeight: 'bold', fontSize: 16}}>Title</Text>
                        <TextInput
                            placeholder="Title"
                            onChangeText={setTitle}
                            value={title}
                        />
                          <Text style= {{fontWeight: 'bold', fontSize: 16}}>Description</Text>
                        <TextInput
                            placeholder="Description"
                            onChangeText={setDescription}
                            value={description}
                        />
                          <Text style= {{fontWeight: 'bold', fontSize: 16}}>Due Date</Text>
                        <TextInput
                            placeholder="Due Date (MM/DD/YYYY HH:mm AM/PM)"
                            onChangeText={setDueDate}
                            value={dueDate}
                        />
                        
                       <View style={styles.modalButtons}>

                      
                            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTask}>
                                <Text style= {{textAlign: 'center', color: 'white'}}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={{color: 'black', textAlign: 'center'}}>Close</Text>
                            </TouchableOpacity>
                            </View>
                    </View>
                </View>
            </Modal>
        </View>

        
    );
}

const styles = StyleSheet.create({
    header1: {
        fontSize: 24,
        color: "green",
        marginTop: 60
    },
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    space: {
        height: 20
    },
    button: {
        backgroundColor: "green",
        borderRadius: 50,
        padding: 9,
        marginLeft: 10,
        width: '75%',
    },



    taskContainer: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 25,
        borderWidth: 1
    },
    taskTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    task: {
        padding: 10,
        margin: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%', 
        paddingHorizontal: 10, 
    },

     updateButton: {

          padding: 8,
          borderRadius: 50,
          width: '40%',
          backgroundColor: 'green',

     },
     closeButton: {

        padding: 8,
        borderRadius: 50,
        width: '40%',
        backgroundColor: 'white',
        borderWidth: 1

   },
});