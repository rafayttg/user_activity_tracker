import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignIn from './component/UserSignIn';
import UserSignUp from './component/UserSignUp';
import Todo from "./component/Todo";
import Acitivities from "./component/Acitivities";
import './assets/css/style.css'

function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<UserSignIn />}></Route>
					<Route path="/signup" element={<UserSignUp />}></Route>
					<Route path="/todo" element={<Todo />}></Route>
					<Route path="/activities" element={<Acitivities />}></Route>
				</Routes >
			</BrowserRouter >


		</>
	)
}

export default App
