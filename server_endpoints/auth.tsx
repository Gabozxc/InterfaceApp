import { IcreateUser, IcreateUserConfirmation, ILoginUser, ILoginUserConfirmation } from "../interfaces/Iusers"

const serverURL = process.env.NEXT_PUBLIC_API_URL_SERVER;

export const createAccount = async (user: IcreateUser): Promise<IcreateUserConfirmation> => {

    try{
        const response = await fetch(`${serverURL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation,
            }),
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

export const loginAccount = async (user: ILoginUser): Promise<ILoginUserConfirmation> => {

    try{
        const response = await fetch(`${serverURL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
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

export const verifyToken = async (token: string): Promise<string> => {

    try{
        const response = await fetch(`${serverURL}/api/verifyToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

        const responseJson = await response.json();

        console.log(response);

        if (responseJson?.error) {
            throw responseJson;
        }

        return responseJson
    }
    catch(err: any){
        throw err;
    }
}