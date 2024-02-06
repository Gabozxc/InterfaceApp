import { Itask, ICreateTask } from "../interfaces/Itask"

const serverURL = process.env.NEXT_PUBLIC_API_URL_SERVER;

export const getTasks = async (token: string): Promise<Itask[]> => {
    try{
        const response = await fetch(`${serverURL}/api/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
        });

        const responseJson = await response.json();

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson
    }
    catch(err: any){
        throw err;
    }
}

export const createTask = async (task: ICreateTask, token: string): Promise<Itask | undefined> => {
    try{

        const response = await fetch(`${serverURL}/api/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: task.name,
                description: task.description,
            })
        });

        const responseJson = await response.json();

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson

    } catch (error) {
        throw error;
    }
};

export const editTask = async (idTask: string, task: ICreateTask, token:string): Promise<Itask | undefined> => {
    try{
        const response = await fetch(`${serverURL}/api/tasks/${idTask}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: task.name,
                description: task.description
            })
        });

        const responseJson = await response.json();

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson

    } catch (error) {
        throw error;
    }
};

export const doneOrUndoneTask = async (idTask: string, getStatusTask: boolean, token:string): Promise<Itask | undefined> => {
    try{
        const booleanStatusTask = Boolean(getStatusTask);
        const response = await fetch(`${serverURL}/api/tasks/${idTask}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                is_completed: !booleanStatusTask
            })
        });

        const responseJson = await response.json();

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson

    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (idTask: string, token:string): Promise<string> => {
    try{
        const response = await fetch(`${serverURL}/api/tasks/${idTask}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const responseJson = await response.json();

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson

    } catch (error) {
        throw error;
    }
};