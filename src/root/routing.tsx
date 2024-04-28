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
    component: <Converter />,
    link: "/converter",
    title: "Converter",
  },
  {
    component: <Settings />,
    link: "/settings",
    title: "Settings",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <ul className="flex h-16 border-b-4">
            <p className="text-5xl mr-3 ml-2">Q;Q;</p>
            {navigation.map((p) => {
              return (
                <>
                  <div className="flex">
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "text-tcb"
                              : "text-tc hover:bg-bc hover:text-tcb bg-bcd",
                            "flex py-4 px-10 text-xl",
                          )
                        }
                        to={p.link}
                      >
                        {p.title}
                      </NavLink>
                    </li>
                  </div>
                </>
              );
            })}
          </ul>

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
      </Router>
    );
  }
}

export default Routing;

function RedirectTo() {
  redirect("/converter");
  return null;
}
