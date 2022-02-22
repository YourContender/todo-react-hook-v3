import { Container, Nav, Navbar } from "react-bootstrap";

const Header = ({ showFormPanel, setShowFormPanel }) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">TodoList-React-HOOK</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => setShowFormPanel(!showFormPanel)} href="#">{!showFormPanel ? 'Add new task' : 'Close form panel'}</Nav.Link>
                        <Nav.Link href="#">Important tasks</Nav.Link>
                        <Nav.Link href="#">Done tasks</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;