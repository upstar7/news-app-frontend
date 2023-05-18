import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../context/AuthContext";
import { navBrand, nav } from "./style";
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
            className="py-4"
            bg="primary"
            variant="dark"
            expand="lg"
            fixed="top"
        >
            <Navbar.Brand style={navBrand} href="/">
                React/Laravel NewsApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={nav} className="ml-auto">
                    {navs
                        .filter((list) =>
                            token ? list.loggedIn : !list.loggedIn
                        )
                        .map((list) => (
                            <LinkContainer
                                to={list.nav === "Logout" ? "" : list.page}
                                onClick={list.nav === "Logout" ? logout : null}
                                key={uuidv4()}
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
