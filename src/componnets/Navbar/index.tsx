import clsx from "clsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const links = [
        {
            name: "Aleatorio",
            link: "/random",
        },
        {
            name: "Crud de Usuários",
            link: "/",
        },
    ];

    return (
        <header className="p-4 flex w-full items-center justify-center gap-4 uppercase font-semibold bg-gray-50 mb-10 border-b border-gray-100">
            {links.map((item) => (
                <Link
                    to={item.link}
                    className={clsx(
                        "text-gray-500 hover:text-gray-700 active:text-gray-400 transition-all border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200",
                        {
                            "text-gray-700 bg-gray-300":
                                window.location.pathname == item.link,
                        }
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </header>
    );
};
