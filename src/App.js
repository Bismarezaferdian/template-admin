import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import { orderColumns, productColumn, userColumns } from "./datatableSource";
import { userInputs } from "./formSource.js";
import New from "./pages/New/index.js";
import Loginuser from "./pages/Login/index.jsx";
import { useSelector } from "react-redux";
import User from "./pages/User/index.js";
import Product from "./pages/Product/index.js";
import Order from "./pages/OrderList/index.js";

function App() {
  console.log(orderColumns);
  const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="App">
      {/* <BrowserRouter> */}

      <Routes>
        <Route path="/">
          <Route path="login" element={<Loginuser />} />

          <Route
            index
            element={
              <ProtectedRoute>
                <Home columns={orderColumns} />
              </ProtectedRoute>
            }
          />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <User columns={userColumns} />
                </ProtectedRoute>
              }
            />
            {/* <Route path=":userId" element={<Single />} /> */}
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="products">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Product columns={productColumn} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="orders">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Order columns={orderColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
