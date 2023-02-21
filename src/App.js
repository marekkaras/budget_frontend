import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Profile from "./Profile.js";
import { RequireToken } from "./js/Auth.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <RequireToken>
              <Profile />
            </RequireToken>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
