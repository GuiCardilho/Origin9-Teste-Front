import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RandomUsersPage } from "../pages/users/random";
import { LayoutDefault } from "../layout/default";
import { CRUDUPage } from "../pages/users/crud";

export const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route
                        path="/random"
                        element={
                            <LayoutDefault element={<RandomUsersPage />} />
                        }
                    />
                    <Route
                        path="/"
                        element={<LayoutDefault element={<CRUDUPage />} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
