import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    let h = <button onClick={() => handleClick('/')}  className="btn btn-primary mx-auto">Log out</button>
    if (localStorage.getItem("signIn") !== "true"){
        h = <button onClick={() => handleClick('/')} hidden className="btn btn-primary mx-auto">Log out</button>
    }
    const logOutButton = h
    const handleClick = (link) => {
        navigate(link)
        localStorage.clear();
        // localStorage.setItem("signIn","false")
    };

    return (
        <nav className="navbar navbar-light bg-light justify-content-center">
            {logOutButton}
                <span className={"mx-auto"}>Власенков Андрей P32312</span>
                <span className={"mx-auto"}>Variant 33678</span>
        </nav>

    )
}
export default Header