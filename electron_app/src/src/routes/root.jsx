import {
    Outlet,
    Link,
    NavLink,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
	  navigation.location &&
	  new URLSearchParams(navigation.location.search).has(
	      "q"
	  );
    useEffect(() => {
	document.getElementById("q").value = q;
    }, [q]);
    
    return (
	<>
	    <div id="sidebar">
		<h1>Handspeak</h1>
		<div>
		    <Form id="search-form" role="search">
			<input
			    id="q"
			    className={searching ? "loading" : ""}
			    aria-label="Search contacts"
			    placeholder="Search"
			    type="search"
			    name="q"
			    defaultValue={q}
			    onChange={(event) => {
				const isFirstSearch = q == null;
				submit(event.currentTarget.form, {
				    replace: !isFirstSearch,
				});
			    }}
			/>
			<div
			    id="search-spinner"
			    aria-hidden
			    hidden={!searching}
			/>
			<div className="sr-only" aria-live="polite"></div>
		    </Form>
		    <Form method="post">
			<button type="submit">New</button>
		    </Form>
		</div>
		<nav>
		    <ul>
			<li>
			    <Link to={`/traduccion`}>Traduccion</Link>
			</li>
			<li>
			    <Link to={`/juegos`}>Juegos</Link>
			</li>
			<li>
			    <Link to={`/aprendizaje`}>Aprendizaje</Link>
			</li>
			<li>
			    <Link to={`/settings`}>Settings</Link>
			</li>			
		    </ul>
		</nav>
	    </div>
	    <div
		id="detail"
		className={
		    navigation.state === "loading" ? "loading" : ""
		}
	    >
		<Outlet />
	    </div>
	</>
  );
}
