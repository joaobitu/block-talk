import "./style.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Description } from "./components/Description";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Description />
    </div>
  );
}

export default App;
