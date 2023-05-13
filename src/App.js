import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import { orderColumns, productColumn, userColumns } from "./datatableSource";
import { productInput, userInputs } from "./formSource.js";
import New from "./pages/NewUser/index.js";
import Loginuser from "./pages/Login/index.jsx";
import { useSelector } from "react-redux";
import User from "./pages/User/index.js";
import Product from "./pages/Product/index.js";
import Order from "./pages/OrderList/index.js";
import NewProduct from "./pages/NewProduct/index.jsx";
import UpdateProduct from "./pages/UpdateProduct/index.jsx";
import Category from "./pages/Category/index.jsx";
import NewCategory from "./pages/NewCategory/index.jsx";
import NewUser from "./pages/NewUser/index.js";
import UpdateCategory from "./pages/UpdateCategory/index.jsx";
import NewForProduct from "./pages/NewProduct/New.jsx";
import NewProductV3 from "./pages/NewProduct/NewProductV3.jsx";

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
                  <NewUser inputs={userInputs} title="Add New User" />
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
              path="newproduct"
              element={
                <ProtectedRoute>
                  <NewProduct inputs={productInput} title="Add New Product" />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewProductV3 inputs={productInput} title="Add New Product" />
                </ProtectedRoute>
              }
            />
            <Route
              path="updateproduct"
              element={
                <ProtectedRoute>
                  <NewProductV3 inputs={productInput} title="Update Product" />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route path="products">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Product columns={productColumn} />
                </ProtectedRoute>
              }
            />
            <Route
              path="newproduct"
              element={
                <ProtectedRoute>
                  <NewProduct inputs={productInput} title="Add New Product" />
                </ProtectedRoute>
              }
            />
            <Route
              path="updateproduct"
              element={
                <ProtectedRoute>
                  <UpdateProduct inputs={productInput} title="Update Product" />
                </ProtectedRoute>
              }
            />
          </Route> */}
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
                  <index inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="category">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="newCategory"
              element={
                <ProtectedRoute>
                  <NewCategory title="Add New Category" />
                </ProtectedRoute>
              }
            />
            <Route
              path="updateCategory"
              element={
                <ProtectedRoute>
                  <UpdateCategory title="Add New Category" />
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
