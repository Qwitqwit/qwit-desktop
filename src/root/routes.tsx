import {Navigate, Route, Routes} from "react-router-dom";
import {navigation} from "./constants.tsx";
import NotExpectedPage from "../errorpages/notExpected.tsx";


export default  function AppRoutes() {
    const indexAppPart = navigation.find((value) =>{ if (value.index === true){
       return  value
    }})

    if (!indexAppPart){
        return NotExpectedPage
    }

    return <div className="mt-2" key="actual-content">
        <Routes>
            <Route index element={<Navigate to={indexAppPart.link} />} />
            {navigation.map((p) => {
                return (
                    <>
                        <Route
                            key={p.link + "appsroute"}
                            path={p.link}
                            element={p.component}
                        />
                    </>
                );
            })}
        </Routes>
    </div>;
}