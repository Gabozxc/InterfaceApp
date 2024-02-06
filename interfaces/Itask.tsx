export interface Itask {
    id: string;
    user_id: string;
    name: string;
    description: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface ICreateTask{
    name: string;
    description?: string;
}