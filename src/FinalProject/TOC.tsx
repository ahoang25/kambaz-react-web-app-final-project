import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";


export default function TOC() {
    return (
        <Nav variant="pills" id="wd-toc">
        
        <Nav.Item> <Nav.Link as={Link} to="/Kambaz" id="wd-a3"> Kambaz </Nav.Link> </Nav.Item>
        
        <Nav.Item>
          <Nav.Link href="https://github.com/ahoang25/kambaz-react-web-app-final-project">Web App Final Project GitHub</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="https://kambaz-node-server-app-final-project-50lh.onrender.com">Render for Final Project </Nav.Link>
        </Nav.Item>

      </Nav>
   );}
   
