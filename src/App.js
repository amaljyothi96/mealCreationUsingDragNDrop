import MealCreation from "./MealCreation"
import "./style.css";
import { createStore } from 'redux';
import rootReducer from './redux/reducer'
import { Provider } from "react-redux";

const store = createStore(rootReducer);


function App() {
  return (
    <Provider store={store}>
      <MealCreation />
    </Provider>

  );
}

export default App;
