import "./index.css";
import Routing from "./root/routing.tsx";
import { themeKey } from "./utils/utils.ts";
import { useReadLocalStorage } from "usehooks-ts";

function App() {
  const theme = useReadLocalStorage(themeKey);
  return (
    <div className="h-screen w-screen" data-theme={theme}>
      <Routing></Routing>
    </div>
  );
}

export default App;
