import { NavLink } from "react-router-dom";
import { navigation, AppPart } from "./constants.tsx";

export default function Navbar() {
  return (
    <div className="navbar shadow-xl animate-in slide-in-from-top duration-300">
      <div className="navbar-start">{AppMenu()}</div>
    </div>
  );
}

function AppMenu() {
  return (
    <>
      <a className="btn btn-ghost text-3xl">qwit</a>
      <ul className="menu menu-horizontal">
        {navigation.map((p) => {
          return (
            <>
              <li key={p.link + "navlinklist"}>{AppNavigationLink(p)}</li>
            </>
          );
        })}
      </ul>
    </>
  );
}

function AppNavigationLink(p: AppPart) {
  return (
    <NavLink className="text-lg" type="link" to={p.link}>
      {p.title}
    </NavLink>
  );
}
