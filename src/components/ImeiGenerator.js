import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
} from "react-bootstrap";


function imei_gen() {
    var pos;
    var str = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sum = 0;
    var final_digit = 0;
    var t = 0;
    var len_offset = 0;
    var len = 15;

    //
    // Fill in the first two values of the string based with the specified prefix.
    // Reporting Body Identifier list: http://en.wikipedia.org/wiki/Reporting_Body_Identifier
    //

    var rbi = ["01","10","30","33","35","44","45","49","50","51","52","53","54","86","91","98","99"];
    var arr = rbi[Math.floor(Math.random() * rbi.length)].split("");
    str[0] = Number(arr[0]);
    str[1] = Number(arr[1]);
    pos = 2;

    //
    // Fill all the remaining numbers except for the last one with random values.
    //

    while (pos < len - 1) {
        str[pos++] = Math.floor(Math.random() * 10) % 10;
    }

    //
    // Calculate the Luhn checksum of the values thus far.
    //

    len_offset = (len + 1) % 2;
    for (pos = 0; pos < len - 1; pos++) {
        if ((pos + len_offset) % 2) {
            t = str[pos] * 2;
            if (t > 9) {
                t -= 9;
            }
            sum += t;
        }
        else {
            sum += str[pos];
        }
    }

    //
    // Choose the last digit so that it causes the entire string to pass the checksum.
    //

    final_digit = (10 - (sum % 10)) % 10;
    str[len - 1] = final_digit;

    // Output the IMEI value.
    t = str.join('');
    t = t.substr(0, len);
    return t;
}



export default class ImeiGenerator extends Component {

	/**
	Crates new instance of the class
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
	}

	generate() {
		var imei = imei_gen();
		var value =  imei + "\n" + this.state.value;
		this.setState({
			value: value,
		});
	}
	
	/**
	  enders the component
	  */
	render() {
		return <Container fluid className={this.props.className}>
			<Row className="align-middle">
				<h1>Random IMEI Generator by Dr.Moe</h1>
			</Row>
			<Row>
				<div>
					<Button 
						variant="primary"
						onClick={(event) => {this.generate(event)}}>Generate New IMEI</Button>
				</div>
			</Row>
			<Row>
				<Col xs={6}>
					<textarea
						class="form-control"
						id="w3review"
						name="w3review"
						value={this.state.value}></textarea>
				</Col>
			</Row>
		</Container>;
	}
}
