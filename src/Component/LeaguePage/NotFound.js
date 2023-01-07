import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 10000)
    }, [])
    return (
        <div className={"header"}>
          NotFound
        </div>
    )
}

export default NotFound;