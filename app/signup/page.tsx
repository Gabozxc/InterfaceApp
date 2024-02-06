"use client"
import { useState } from "react";
import { createAccount } from "@/server_endpoints/auth"
import { IcreateUser, IcreateUserConfirmation } from "@/interfaces/Iusers"
import CircleSpinnerBasic from "@/components/Spinners/CircleSpinner";
import withAuth from "@/lib/withAuth";


function SignUp() {

    const [form, setForm] = useState<IcreateUser>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([""]);
    const [notification, setNotification] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user: IcreateUserConfirmation = await createAccount(form);
            setNotification("Account successfully created, you can go to log in.")
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
        setIsLoading(false);
        setTimeout(() => {
            setErrors([]);
            setNotification("");
        }, 3000)
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Your name</label>
                            <div className="mt-2">
                                <input id="name" name="name" type="name" required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                                address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="my-3">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="my-3">
                            <div className="flex items-center justify-between">
                                <label htmlFor="passwordRepeat" className="block text-sm font-medium leading-6 text-gray-900">Repeat
                                    Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password_confirmation" name="password_confirmation" type="password" required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <button type="submit" id="button-create-account"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={isLoading}>{
                                    isLoading ? <CircleSpinnerBasic /> :
                                        "Sign up"}
                            </button>
                        </div>

                        {errors.length > 0 ?
                            <div>
                                <ul>
                                    {errors.map((e, index) => <li className="text-red-500" key={index}>{e}</li>)}
                                </ul>

                            </div> : ""
                        }

                        {notification.trim() !== "" ?
                            <div>
                                <ul>
                                    <li className="text-green-600">{notification}</li>
                                </ul>
                            </div> : ""
                        }

                    </div>
                </div>
            </form>
        </main>
    );
}

export default withAuth(SignUp);