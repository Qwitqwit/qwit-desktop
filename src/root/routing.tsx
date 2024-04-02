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
          <ul className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            {navigation.map((p) => {
              return (
                <>
                  <div className="flex">
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-bc text-tcb"
                              : "text-tc hover:bg-bc hover:text-tcb",
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
