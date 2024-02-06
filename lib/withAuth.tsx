import { useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { AuthContext } from '@/context/authContext';
import { verifyToken } from '@/server_endpoints/auth';

const withAuth = (WrappedComponent: any) => {
    const WithAuthComponent = (props: any) => {
        const router = useRouter();
        const path = usePathname();
        const { state, dispatch } = useContext(AuthContext);

        const checkToken = useCallback(async () => {
            if (state.token) {
                try {
                    const verifyTokenResult = await verifyToken(state.token);
                    router.replace('/');
                } catch (err) {
                    console.log(err);
                    dispatch({ type: "REMOVE_TOKEN" });
                    router.replace('/login');
                }
            } else {
                if (path === "/") {
                    router.replace('/login');
                }
            }
        }, [state.token, router, dispatch, path]);

        useEffect(() => {
            const localToken = localStorage.getItem('token');
            if (localToken && state.token !== localToken) {
                dispatch({ type: "SET_TOKEN", payload: localToken });
                checkToken();
                return;
            }

            if (localToken && state.token === localToken) {
                router.replace('/');
                return;
            }

            if (!localToken && !state.token && path === "/") {
                router.replace('/login');
            }

        }, [state.token, checkToken, dispatch, router, path]);

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuthComponent;
};

function getDisplayName(WrappedComponent: any) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;