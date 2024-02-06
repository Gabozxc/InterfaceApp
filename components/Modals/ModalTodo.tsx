import { Dispatch, SetStateAction, useContext, useState } from "react";

import { ICreateTask, Itask } from "@/interfaces/Itask";
import { AuthContext } from "@/context/authContext";
import { editTask } from "@/server_endpoints/tasks";
import CircleSpinnerBasic from "../Spinners/CircleSpinner";

interface ModalTodoProps {
    closeModal: () => void;
    taskToEdit: Itask;
    setLocalTasks: Dispatch<SetStateAction<Itask[]>>;
}

const ModalTodo = ({ closeModal, taskToEdit, setLocalTasks }: ModalTodoProps) => {

    const [errors, setErrors] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<ICreateTask>({
        name: taskToEdit.name,
        description: taskToEdit.description,
    });

    const { state } = useContext(AuthContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onHandleEditTask = async () => {
        setLoading(true);
        try {
            if (state.token) {
                const editTaskResult = await editTask(taskToEdit.id, form, state.token);
                if (editTaskResult) {
                    setLocalTasks(prevTasks => prevTasks.map(task =>
                        task.id === taskToEdit.id ? { ...task, name: editTaskResult.name, description: editTaskResult.description } : task
                    ));
                    closeModal();
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

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-2xl mb-4">Edit Task - {taskToEdit.name}</h2>
                        <div className="flex mt-4 justify-center items-center w-full flex-col">
                            <div className="flex items-center justify-center flex-col w-full">
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker my-2" placeholder="Edit Todo" name="name" id="name" onChange={handleChange} value={form.name} />
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker flex items-center justify-center" placeholder="Edit Description" name="description" id="description" onChange={handleChange} value={form.description} />
                            </div>
                            <button disabled={loading} className="py-2 px-3 my-2 border-2 rounded text-teal border-teal hover:bg-gray-200 hover:bg-teal w-full" onClick={onHandleEditTask}>{
                                loading ? <CircleSpinnerBasic /> : "Edit"
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
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTodo;