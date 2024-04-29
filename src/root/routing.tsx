import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  redirect,
} from "react-router-dom";
import Settings from "../parts/settings.tsx";
import "./../index.css";
import { Component, ReactElement } from "react";
import Converter from "../parts/converter.tsx";

interface Part {
  component: ReactElement<unknown, string>;
  link: string;
  title: string;
}
const navigation: Part[] = [
  {
    component: <Converter key="converter" />,
    link: "/converter",
    title: "Converter",
  },
  {
    component: <Settings key="settings" />,
    link: "/settings",
    title: "Settings",
  },
];

class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <div className="navbar shadow-xl">
            <div className="navbar-start">
              <a className="btn btn-ghost text-3xl">qwit</a>
              <ul className="menu menu-horizontal">
                {navigation.map((p) => {
                  return (
                    <>
                      <li>
                        <NavLink className="text-lg" type="link" to={p.link}>
                          {p.title}
                        </NavLink>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>

            <div className="navbar-center hidden lg:flex"></div>
            <div className="navbar-end"></div>
          </div>

          <div className="mt-2">
            <Routes>
              <Route path="/" element={<RedirectTo />}></Route>
              {navigation.map((p) => {
                return (
                  <>
                    <Route path={p.link} element={p.component}></Route>
                  </>
                );
              })}
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routing;

function RedirectTo() {
  redirect("/converter");
  return null;
}
