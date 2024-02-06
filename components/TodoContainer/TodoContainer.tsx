import { useContext, useEffect, useState } from "react";

import { Itask, ICreateTask } from "@/interfaces/Itask";
import CircleSpinnerBasic from "../Spinners/CircleSpinner";

import { createTask, deleteTask, doneOrUndoneTask } from "@/server_endpoints/tasks";
import { AuthContext } from "@/context/authContext";
import ModalTodo from "../Modals/ModalTodo";

const TodoContainer = ({ tasks, isFetching }: { tasks: Itask[], isFetching: boolean }) => {

    const [localTasks, setLocalTasks] = useState(tasks);
    const [taskToEdit, setTaskToEdit] = useState<Itask>(tasks[0]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([""]);
    const { state } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [form, setForm] = useState<ICreateTask>({
        name: '',
        description: '',
    });

    useEffect(() => {
        setLocalTasks(tasks)
    }, [tasks])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onHandleCreateTask = async () => {
        setLoading(true);
        try {
            if (state.token) {
                const createTaskResult = await createTask(form, state.token);
                console.log(createTaskResult);
                if (createTaskResult) {
                    console.log("en el if")
                    setLocalTasks([createTaskResult, ...localTasks]);
                }
            }
        }
        catch (err: any) {
            setErrors([]);
            for (let key in err.error) {
                if (Array.isArray(err.error[key])) {
                    err.error[key].forEach((value: string, index: number) => {
                        setErrors([value]);
                    });
                }
            }
        }
        setLoading(false);
    }

    const onHandleDeleteTask = async (idTask: string) => {
        setLoading(true);
        try {
            if (state.token && idTask) {
                const getStatusTaskResult = await deleteTask(idTask, state.token);

                if (getStatusTaskResult) {
                    const updatedTasks = localTasks.filter(task => task.id !== idTask);
                    setLocalTasks(updatedTasks);
                }
            }
        }
        catch (err: any) {
            console.log(err);
            setErrors([]);
            for (let key in err.error) {
                if (Array.isArray(err.error[key])) {
                    err.error[key].forEach((value: string, index: number) => {
                        setErrors([value]);
                    });
                }
            }
        }
        setLoading(false);
    }

    const onHandleDoneTask = async (idTask: string) => {
        setLoading(true);
        try {

            const searchStatusTask = localTasks.find(e => e.id === idTask);

            if (state.token && idTask && searchStatusTask) {

                const getStatusTaskResult = await doneOrUndoneTask(idTask, searchStatusTask.is_completed, state.token);

                if (getStatusTaskResult) {

                    const index = localTasks.findIndex(e => e.id === idTask);

                    searchStatusTask.is_completed = getStatusTaskResult?.is_completed;

                    let updatedTasks = [...localTasks];

                    updatedTasks[index] = searchStatusTask;

                    setLocalTasks(updatedTasks);
                }
            }
        }
        catch (err: any) {
            console.log(err);
            setErrors([]);
            for (let key in err.error) {
                if (Array.isArray(err.error[key])) {
                    err.error[key].forEach((value: string, index: number) => {
                        setErrors([value]);
                    });
                }
            }
        }
        setLoading(false);
    }

    function openModal(idTask: string) {
        const task = localTasks.find(e => e.id === idTask);
        if (task) {
            setTaskToEdit(task);
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4 justify-center items-center w-full flex-col">
                            <div className="flex items-center justify-center flex-col w-full">
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker my-2" placeholder="Add Todo" name="name" id="name" onChange={handleChange} />
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker flex items-center justify-center" placeholder="Add Description" name="description" id="description" onChange={handleChange} />
                            </div>
                            <button disabled={loading} className="py-2 px-3 my-2 border-2 rounded text-teal border-teal hover:bg-gray-200 hover:bg-teal w-full" onClick={onHandleCreateTask}>{
                                loading ? <CircleSpinnerBasic /> : "Add"
                            }</button>
                            {errors.length > 0 ?
                                <div>
                                    <ul>
                                        {errors.map((e, index) => <li className="text-red-500" key={index}>{e}</li>)}
                                    </ul>

                                </div> : ""
                            }

                        </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">

                        {isFetching ? <div className="flex justify-center items-center"><CircleSpinnerBasic /></div> : localTasks?.map((e, index) =>
                            <div key={index} className="flex mb-4 items-center justify-between">
                                <div>
                                    <p className={`w-full ${e.is_completed && "line-through"} text-green`}>{e.name}</p>
                                    <p className="w-full text-green">{e.description}</p>
                                </div>
                                <div className="flex flex-wrap">
                                    <button onClick={() => onHandleDoneTask(e.id)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-grey border-grey hover:bg-gray-200">{e.is_completed ? "Not Done" : "Done"}</button>
                                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-gray-200 hover:bg-red"
                                        onClick={() => openModal(e.id)}>Edit</button>
                                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-gray-200 hover:bg-red" onClick={() => onHandleDeleteTask(e.id)}>Remove
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {modalIsOpen && <ModalTodo closeModal={closeModal} taskToEdit={taskToEdit} setLocalTasks={setLocalTasks}/>}

        </>
    );
}

export default TodoContainer;