// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
	// hide results
	document.getElementById('results').style.display = 'none';
	// show the loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 2000);
	e.preventDefault();
});

// Calculate Results
function calculateResults() {
	console.log('Calculating...');
	//UI vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');

	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// compute monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = principal * x * calculatedInterest / (x - 1);

	console.log('FOO');

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		// hide loader
		document.getElementById('loading').style.display = 'none';
		// show results
		document.getElementById('results').style.display = 'block';
		console.log('BAZ');
	} else {
		showError('Please check your numbers.');
	}

	// e.preventDefault();
}

function showError(error) {
	// hide loader
	document.getElementById('loading').style.display = 'none';
	// hide results
	document.getElementById('results').style.display = 'none';
	// create a div
	const errorDiv = document.createElement('div');

	// get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// add class
	errorDiv.className = 'alert alert-danger';

	// create textnode and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// insert error above heading
	card.insertBefore(errorDiv, heading);

	// clear error after 3 second
	setTimeout(clearError, 3000);
}

function clearError() {
	document.querySelector('.alert').remove();
}
