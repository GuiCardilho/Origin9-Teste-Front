import { AllContexts } from "./contexts";
import { AllRoutes } from "./routes";

import "./styles/normalize.css";
import "./styles/plugins/tailwindcss.css";
import "./styles/scroll.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
    return (
        <>
            <AllContexts>
                <AllRoutes />
            </AllContexts>
        </>
    );
};
