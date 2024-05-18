import type React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { protectedRoutes } from '@/routes';
import Layouts from '../Layouts';
import { Suspense } from 'react';
import Loading from '../Common/Loading';

const ProtectedRoutes: React.FC = () => {
    const { userRole } = useAuthStore();

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {protectedRoutes.map(
                    ({ key, path, component: Component, role }) => {
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        if (role && !role.includes(userRole!)) {
                            return null; // Don't render the route if the user doesn't have the required role
                        }

                        return (
                            <Route
                                key={key}
                                path={path}
                                element={
                                    <Layouts>
                                        <Suspense fallback={<Loading />}>
                                            <Component />
                                        </Suspense>
                                    </Layouts>
                                }
                            />
                        );
                    },
                )}
                <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
        </Suspense>
    );
};

export default ProtectedRoutes;
