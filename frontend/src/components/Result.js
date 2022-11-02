import React, { useContext } from 'react'
import { CalculatorContext } from '../contexts/CalculatorContext'

function Result() {
	const { result } = useContext(CalculatorContext);
	const productDimensions = `${result.name} (${result.length}"x${result.width}"x${result.height}"@${result.weight}lbs)`
	const productDetails = `${result.product_type.name} - ${productDimensions}`

	return (
		<div className="row">
			<div className="col-lg-12 col-md-12 col-sm-12">
				<div id="result">
					<p className="text-center">
						Use this for {productDimensions}
					</p>
					<h3 className="text-center" id="productName">
						{productDetails}
					</h3>
				</div>
			</div>
		</div>
	)
}

export default Result