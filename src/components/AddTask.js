import React, { useState } from 'react'
import Notification from './Notification'
import addtaskService from '../services/addtask'



const AddTask = ({ setTask, setShowAddTask }) => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState(null)
    const [assignment, setAssignment] = useState(null)
    const [review, setReview] = useState(null)
    const [instruction, setInstruction] = useState(null)



    const handleAddTask = async (event) => {
        event.preventDefault()
        try {
            const task = await addtaskService.addtask({
                name,
            })
            window.localStorage.setItem(
                'task', JSON.stringify(task)
            )
            setTask(task)
            setName('')
        } catch {
            setErrorMessage('Jotain meni vikaan')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Lisää tehtävä</h2>
            <Notification message={errorMessage} />
            <form onSubmit={handleAddTask}>
                <div>
                    <input
                        className=""
                        type="text"
                        value={name}
                        name="Name"
                        placeholder="Tehtävän otsikko"
                        onChange={({ target }) => setName(target)}
                    />

                </div>
                <div>
                    <textarea 
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={assignment}
                        name="Assignment"
                        placeholder="Tehtävänanto"
                        onChange={({ target }) => setAssignment(target)}
                    />

                    
                </div>
                <div>
                    <textarea 
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={review}
                        name="Review"
                        placeholder="Arvostelu"
                        onChange={({ target }) => setReview(target)}
                    />
                </div>
                <div>
                    <textarea 
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={instruction}
                        name="Instruction"
                        placeholder="Ohjeet"
                        onChange={({ target }) => setInstruction(target)}
                    />
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <button type="submit" className="signup-button">Lisää tehtävä</button>
            </form>
        </div>
    )
}
export default AddTask