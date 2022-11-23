import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container mx-auto">
      <button className="btn btn-primary">Buy Now</button>
      <Toaster />
    </div>
  );
}

export default App;
