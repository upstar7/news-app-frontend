import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";
import { navs } from "../../config/config";
import { setLoggedOut } from "../../utils/auth";
import HttpService from "../../services/httpService";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        HttpService.get("logout", "", true).then((response) => {
            console.log(response);
            if (response.status === 204) {
                setLoggedOut();
                setToken("");
                navigate("/login");
            }
        });
    };

    return (
        <Navbar
            className="py-3"
            bg="primary"
            variant="dark"
            expand="lg"
            fixed="top"
        >
            <Navbar.Brand className="brand" href="/">
                <h2>React/Laravel NewsApp</h2>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mr-3">
                    {navs
                        .filter((list) =>
                            token ? list.loggedIn : !list.loggedIn
                        )
                        .map((list) => (
                            <LinkContainer
                                key={list.page}
                                to={list.nav === "Logout" ? "" : list.page}
                                onClick={list.nav === "Logout" ? logout : null}
                            >
                                <Nav.Link className="ml-2">{list.nav}</Nav.Link>
                            </LinkContainer>
                        ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavBar;
