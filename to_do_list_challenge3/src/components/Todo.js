import React, { useEffect, useState } from 'react';

export default function Todo() {

    const [taskList, setTaskList] = useState([]);
    const [currTask, setCurrTask] = useState({
        task: '', date: '', completed: false
    });

    function handleInput(e) {
        var key = e.target.name;
        var value = e.target.value;

        setCurrTask((prev) => ({
            ...prev,
            [key]: value
        }));
    }

    function handleAddTask() {
        setTaskList([...taskList, currTask]);
        setCurrTask({ task: '', date: '', completed: false }); // Reset current task
    }

    function handleCheckboxChange(targetIndex) {
        const updatedList = taskList.map((i, index) =>
            index === targetIndex ? { ...i, completed: !i.completed } : i
        );

        setTaskList(updatedList);
    }

    // Retrieve tasks from local storage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem('taskList');
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to local storage whenever taskList changes
    useEffect(() => {
        console.log('Saving to localStorage:', taskList); // Debugging
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    return (
        <div>
            <div className='input-container'>
                <div className='task-input'>
                    <label>Task</label>
                    <input
                        type='text'
                        value={currTask.task}
                        name='task'
                        placeholder='Enter a task'
                        onChange={(e) => handleInput(e)}
                    />
                </div>

                <div className='date-input'>
                    <label>To do date</label>
                    <input
                        type='date'
                        value={currTask.date}
                        name='date'
                        onChange={(e) => handleInput(e)}
                    />
                </div>

                <div className='add'>
                    <button className='add-btn' onClick={handleAddTask}>Add task</button>
                </div>
            </div>

            <div className='display-task-items'>
                <ol>
                    {taskList.map((i, index) => (
                        <li key={index}>
                            <span
                                style={{
                                    textDecoration: i.completed ? 'line-through' : 'none',
                                }}
                            >
                                {i.task}
                            </span>
                            <span
                                style={{
                                    textDecoration: i.completed ? 'line-through' : 'none',
                                }}
                            >
                                {i.date}
                            </span>
                            <input
                                type='checkbox'
                                checked={i.completed}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
