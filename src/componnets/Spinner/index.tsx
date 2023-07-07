import { useLoading } from "../../hooks/loading";

export const Spinner = () => {
    const { loading } = useLoading();

    return loading ? (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    ) : (
        <></>
    );
};
