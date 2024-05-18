import type React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "@/routes";
import { Suspense } from "react";
import Loading from "../Common/Loading";

const PublicRoutes: React.FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{publicRoutes.map(({ key, path, component: Component }) => (
					<Route key={key} path={path} element={<Component />} />
				))}
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Suspense>
	);
};

export default PublicRoutes;
