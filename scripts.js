document.getElementById('questionnaire-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const responseCounts = {
        'Never': 0,
        'Rarely': 0,
        'Sometimes': 0,
        'Often': 0,
        'Always': 0
    };

    formData.forEach((value) => {
        switch (value) {
            case '1':
                responseCounts['Never']++;
                break;
            case '2':
                responseCounts['Rarely']++;
                break;
            case '3':
                responseCounts['Sometimes']++;
                break;
            case '4':
                responseCounts['Often']++;
                break;
            case '5':
                responseCounts['Always']++;
                break;
        }
    });

    const totalResponses = Object.values(responseCounts).reduce((a, b) => a + b, 0);
    const mentalHealthScore = (responseCounts['Always'] * 5 + responseCounts['Often'] * 4 + 
                               responseCounts['Sometimes'] * 3 + responseCounts['Rarely'] * 2 + 
                               responseCounts['Never']) / totalResponses;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <div><strong>Mental Health Score</strong>: ${mentalHealthScore.toFixed(2)}</div>
        <canvas id="pieChart"></canvas>
    `;

    drawChart(responseCounts);
});

function drawChart(responseCounts) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            datasets: [{
                data: Object.values(responseCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // Never
                    'rgba(54, 162, 235, 1)', // Rarely
                    'rgba(255, 206, 86,1)', // Sometimes
                    'rgba(75, 192, 192, 1)', // Often
                    'rgba(153, 102, 255, 1)' // Always
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}
