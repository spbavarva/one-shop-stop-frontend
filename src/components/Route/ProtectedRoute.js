import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  if(loading === true){
    return <>loading..</>
  } 
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {Element}
    </div>
  )

  // return (
  //   <Fragment>
  //     {loading === false && (
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (isAuthenticated === false) {
  //             return <Navigate to="login" />;
  //           }
  //           if (isAdmin === true && user.role !== "admin") {
  //             return <Navigate to="/login" />;
  //           }
  //           return <Element {...props} />;
  //         }}
  //       ></Route>
  //     )}
  //   </Fragment>
  // );
};
// const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
//   const { user, isAuthenticated, loading } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="login" />;
//             }
//             if (isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" />;
//             }
//             return <Element {...props} />;
//           }}
//         ></Route>
//       )}
//     </Fragment>
//   );
// };

export default ProtectedRoute;
