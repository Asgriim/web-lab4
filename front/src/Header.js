import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const handleClick = (link) => {
        navigate(link)
        localStorage.setItem("signIn","false")
    };

    return (
        <nav className="navbar navbar-light bg-light justify-content-center">
                <button onClick={() => handleClick('/')} className="btn btn-primary mx-auto">Log out</button>
                <span className={"mx-auto"}>Власенков Андрей P32312</span>
                <span className={"mx-auto"}>Variant 33678</span>
        </nav>

    )
}
export default Header