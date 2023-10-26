import { useRouteError } from "react-router-dom";
const Error = () =>{
    const err = useRouteError();
    return (
        <>
        <h1>OOPS!!!</h1>
        <h2>Something went wrong.</h2>
        <h2>{err.data}</h2>
        </>
    )
}
export default Error;