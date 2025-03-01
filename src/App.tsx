import { RouterProvider } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { router } from "./routes";

function App() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return <RouterProvider router={router(user?.role === "admin")} />;
}

export default App;
