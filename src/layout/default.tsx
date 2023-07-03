import { Navbar } from "../componnets/Navbar";

interface IProps {
    element?: React.ReactNode;
}

export const LayoutDefault = ({ element }: IProps) => {
    return (
        <>
            <Navbar />
            {element}
        </>
    );
};
