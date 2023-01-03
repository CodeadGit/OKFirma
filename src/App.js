import {BrowserRouter as Router} from "react-router-dom"
import { VenderStack } from "./pages/renderStack";

function App() {
  return (
    <>
        <Router>
            <VenderStack/>
        </Router>
    </>
  );
}

export default App;
