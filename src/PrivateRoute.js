import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseapp from "./Firestore";

// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
// 	const { currentUser } = useContext(AuthContext);
// 	return (
// 		<Route
// 			{...rest}
// 			render={(routeProps) =>
// 				!!currentUser ? (
// 					<RouteComponent {...routeProps} />
// 				) : (
// 					<Redirect to={"/Login"} />
// 				)
// 			}
// 		/>
// 	);
// };

const PrivateRoute = () => {
	return firebaseapp.auth().onAuthStateChanged((user) => {
		if (user) {
			return <Redirect to='/Dashboard' />;
		} else {
			return <Redirect to='/Login' />;
		}
	});
};

export default PrivateRoute;
