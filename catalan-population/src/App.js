import { useEffect, useState, useReducer } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import {
  AppContext,
  AppDispatchContext,
} from "./services/AppContext/AppContextCreator";

function App() {
  const [data, setData] = useState();
  const initialState = { updatedData: data };
  function reducer(state, action) {
    switch (action.type) {
      case "update":
        return { ...initialState, updatedData: action };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://analisi.transparenciacatalunya.cat/resource/b4rr-d25b.json?$limit=150000"
      ).then((res) => res.json());
      setData(response);
    }
    fetchData();
  }, []);

  console.log("data", data);
  return (
    data && (
      <AppContext.Provider value={{ data, state }}>
        <AppDispatchContext.Provider value={dispatch}>
          <Dashboard />
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    )
  );
}

export default App;
