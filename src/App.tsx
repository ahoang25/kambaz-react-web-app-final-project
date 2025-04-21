import FinalProject from "./FinalProject";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

export default function App() {
 return (
  <HashRouter>
          <Provider store={store}>
   <div>
    <Routes>
    <Route path="/" element={<Navigate to="FinalProject"/>}/>
     <Route path="/FinalProject/*" element={<FinalProject />} />
     <Route path="/Kambaz/*" element={<Kambaz />} />
    </Routes>
   </div>
          </Provider>
  </HashRouter>
);}
