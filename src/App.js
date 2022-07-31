import { BrowserRouter } from "react-router-dom";
import Main from "./Components/MainComponent";
import { Provider } from "react-redux";

import { store } from "./redux";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
