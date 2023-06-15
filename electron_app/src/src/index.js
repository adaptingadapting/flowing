import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, {
    loader as rootLoader,
    action as rootAction,    
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from "./routes/contact";
import EditContact, {
    action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import Traduccion from "./routes/traduccion";
import Juegos from "./routes/juegos";
import Aprendizaje from "./routes/aprendizaje";
import Settings from "./routes/settings";

const router = createBrowserRouter([
    {
	path: "/",	
	element: <Root />,
	errorElement: <ErrorPage />,
	loader: rootLoader,
	action: rootAction,
	children: [
	    {
		errorElement: <ErrorPage />,
		children: [
		    { index: true, element: <Index /> },
		    {
			path: "traduccion",
			element: <Traduccion />,
		    },
		    {
			path: "juegos",
			element: <Juegos />,
		    },
		    {
			path: "aprendizaje",
			element: <Aprendizaje />,
		    },
		    {
			path: "settings",
			element: <Settings />,
		    },
		],
	    },
	],
    },
]);
    
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
	<RouterProvider router={router} />
    </React.StrictMode>,
)
