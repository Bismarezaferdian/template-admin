import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import List from "./pages/List/index.js";
import { userColumns } from "./datatableSource";
import { userInputs } from "./formSource.js";
import New from "./pages/New/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home columns={userColumns} />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="users">
              <Route index element={<List columns={userColumns} />} />
              {/* <Route path=":userId" element={<Single />} /> */}
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
