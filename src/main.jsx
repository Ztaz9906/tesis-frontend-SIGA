import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Provider} from "react-redux";
import {store} from "./redux/Store";
import {BrowserRouter as Router} from "react-router-dom";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider
				preventDuplicate
				dense
				maxSnack={2}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				autoHideDuration={5000}
			>
				<Router>
					<App/>
				</Router>
			</SnackbarProvider>
		</Provider>
	</React.StrictMode>
);
