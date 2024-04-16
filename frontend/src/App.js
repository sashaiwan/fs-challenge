import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./custom.scss";
import Header from "./components/header";
import FilesTable from "./components/filesTable";

function App() {
  return (
    <div className="App">
      <Header />
      <FilesTable />
    </div>
  );
}

export default App;
