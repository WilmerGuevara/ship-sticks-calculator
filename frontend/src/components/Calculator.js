import React from 'react';
import Button from 'react-bootstrap/Button';
import { CalculatorContext } from '../contexts/CalculatorContext';
import ModalShippingCalculator from './forms/ModalShippingCalculator';
import Result from './Result';

const Calculator = () => {
	const [show, setShow] = React.useState(false);
	const [result, setResult] = React.useState(null);

	return (
		<>
			<CalculatorContext.Provider value={{ result, setResult }}>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<h1>Choose Your Packaging</h1>
						Use our packaging calculator to choose a perfectly sized box or bag for your equipment
						<hr noshade="" color="#eeeeee" /><br />
						<div>
							<Button className="btn btn-primary" onClick={() => setShow(true)}>
								Launch Calculator
							</Button>
						</div>
					</div>
				</div>
				<ModalShippingCalculator show={show} handleClose={() => setShow(false)} />
				{ result && <Result /> }
			</CalculatorContext.Provider>
		</>
	);
}

export default Calculator;

