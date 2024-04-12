import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Settings from "../parts/settings.tsx";
import Home from "../parts/home.tsx";
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
    component: <Home />,
    link: "/home",
    title: "Home",
  },
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
          <ul className="flex pt-6 pb-6">
            {navigation.map((p) => {
              return (
                <>
                  <div className="flex mr-3">
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-bc text-tcb"
                              : "text-tc hover:bg-bc hover:text-tcb bg-bcd",
                            "rounded-md px-4 py-2 text-lg font-medium",
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
