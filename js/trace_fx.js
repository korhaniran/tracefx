function trace_trial(){
	var debit_ccy = document.getElementById('debit_ccy').value
	var credit_ccy = document.getElementById('credit_ccy').value
	var pymnt_date = document.getElementById('pymnt_date').value
	var pymnt_time = document.getElementById('pymnt_time').value
	var rate_applied = document.getElementById('rate_applied').value
	var provider = document.getElementById('provider').value	
	
	if(pymnt_time == ''){
		alert('call daily histo')
	}
	else{
		alert('call tradermade api')
	}
}


function trace_trial_temp(){

	var fixerIO_hist_url = "http://data.fixer.io/api/"
	fixerIO_hist_url += document.getElementById('date_rate').value;
	fixerIO_hist_url += '?access_key=53af8a9128afac978a04648d58c79bc9&base='
	fixerIO_hist_url += document.getElementById('debit_currency').value
	fixerIO_hist_url += '&symbols='
	fixerIO_hist_url += document.getElementById('credit_currency').value
	alert(fixerIO_hist_url)
	
	var fixerIO_url = 'http://data.fixer.io/api/2018-02-02?access_key=53af8a9128afac978a04648d58c79bc9&base=EUR&symbols=GBP'
	var fixerIO_test = 'http://data.fixer.io/api/2013-12-24?access_key=53af8a9128afac978a04648d58c79bc9'

	
	var request = new XMLHttpRequest();
	request.open('GET', fixerIO_hist_url, true)

	request.onload = function (){
		var fixerIO_data = JSON.parse(this.response);

		if(request.status >= 200 && request.status < 400) {
			console.log(fixerIO_data);
			const app = document.getElementById('latest_rate');
			
			const latest_title = document.createElement('h1');
			latest_title.textContent = 'Latest rate';
			
			const latest_data = document.createElement('p');
			latest_data.textContent = fixerIO_data.rates[document.getElementById('credit_currency').value];
			
			
			var report_section = document.getElementById("report_section");
			report_section.style.display = "block";

			const result_title = document.createElement('h2');
			result_title.textContent = "About your payment";
			
			const result_desc = document.createElement('p');
			
			
			margin_avg = parseFloat(document.getElementById('rate_applied').value) - parseFloat(fixerIO_data.rates[document.getElementById('credit_currency').value])
			alert(margin_avg)

			if(margin_avg >= -0.005){
				result_desc.textContent = "Anything under 50 bps (or 0.5%) is competitive in the current market and you have received a good deal.  There is always the possibility of finding something slightly better, but in our opinion your provider has offered you good pricing and you do not need to look for another deal unless you are highly motivated to make small financial savings or are sending large amounts.  Please note that, if you were promised less than the margin that has been applied, you should contact your provider and seek a refund or, if you prefer, contact the regulator.";
			}
			else if (margin_avg >= -0.0099){
				result_desc.textContent = "A margin between 50 and 99 bps (or 0.5% to 0.99%) is reasonably standard, although you can do better.  The closer the margin was to 99 bps (0.99%) the more you should consider looking for a better deal next time.  You will definitely do better than this if you shop around.  Please note that, if you were promised less than the margin that has been applied, you should contact your provider and seek a refund or, if you prefer, contact the regulator."
			}
			else if (margin_avg >= -0.0149){
				result_desc.textContent = "A margin between 100 bps and 149 bps (1% to 1.49%) is reasonably expensive and you can definitely do better.  This provider is charging a large margin and you should definitely look for a better deal next time.  Please note that, if you were promised less than the margin that has been applied, you should contact your provider and seek a refund or, if you prefer, contact the regulator."
			}
			else{
				result_desc.textContent = "A margin of 150 bps or more (1.5% or greater) is excessive.  I’m afraid there’s only one way to put this - you’ve been ripped off.  Do not use this provider again.  Please note that, if you were promised less than the margin that has been applied, you should contact your provider and seek a refund or, if you prefer, contact the regulator."
			}
			
			var report_expl = document.getElementById("report_explainations");
			report_expl.style.display = "block";
			
			
			const traceFX_report = document.getElementById('TraceFX_report');
			traceFX_report.appendChild(result_title);
			traceFX_report.appendChild(result_desc);
			
			const test_text = document.getElementById('test_text');
			test_text.textContent = "test"
			traceFX_report.appendChild(test_text);
		
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
		  type: 'bar',
		  data: {
			labels: ['Average', 'Low'],
			datasets: [{
			  label: 'Margin vs',
			  data: [margin_avg, 0],
			  backgroundColor: "rgba(0,155,251,0.4)"
			}]
		  }
		});
			
		} else {
			console(request.status);
			const app = document.getElementById('latest_rate');
			
			const latest_title = document.createElement('h1');
			latest_title.textContent = 'Latest rate';
			
			const latest_data = document.createElement('p');
			latest_data.textContent = 'Not working';
			app.appendChild(latest_title);
			app.appendChild(latest_data);
		}
	}

	request.send();

}