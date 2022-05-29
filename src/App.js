import ImeiGenerator from './components/ImeiGenerator';
import logo from './logo.svg';
import './App.css';
import { 
	Container,
	Row,
	Col
} from "react-bootstrap";

function App() {
	return (
		<Container
			fluid>
			<Row
				className="ms-5">
				<img
					height="32px"
					src={logo}
					className="App-logo col-1"
					alt="logo"
					style={{
						'margin': '0px',
						'padding': '0px',
					}} />
				<Col className="align-middle m-0"><p>Random IMEI Generator</p></Col>
			</Row>
			<ImeiGenerator></ImeiGenerator>
		</Container>
	);
}

export default App;
