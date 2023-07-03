import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <header className="p-4 flex w-full items-center justify-center gap-4 uppercase font-semibold bg-gray-50 mb-10 border-b border-gray-100">
            <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 active:text-gray-400 transition-all"
            >
                CRUD
            </Link>
            <Link
                to="/random"
                className="text-gray-500 hover:text-gray-700 active:text-gray-400 transition-all"
            >
                Aleatório
            </Link>
        </header>
    );
};
