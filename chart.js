<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    let cgpaChart, attendanceChart, creditChart;

    function initCharts() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#aaaaaa' : '#888888';
        const gridColor = isDark ? '#333' : '#eee';

        // 1. CGPA CHART (Linked to Results)
        cgpaChart = new Chart(document.getElementById('cgpaChart'), {
            type: 'bar',
            data: { 
                labels: ['Sem 1', 'Sem 2', 'Sem 3',], 
                datasets: [{ 
                    label: 'GPA',
                    data: [3.82, 3.71, 3.88,], 
                    backgroundColor: '#8C1515', 
                    borderRadius: 8 
                }] 
            },
            options: { 
                onClick: (evt, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const semester = index + 1;
                        window.location.href = `results.html?sem=${semester}`;
                    }
                },
                plugins: { 
                    legend: { display: false },
                    tooltip: { callbacks: { label: (ctx) => `GPA: ${ctx.raw} (Click for details)` } }
                }, 
                scales: { 
                    y: { min: 0, max: 4, grid: { color: gridColor }, ticks: { color: textColor } }, 
                    x: { ticks: { color: textColor } } 
                } 
            }
        });

        // 2. ATTENDANCE CHART (Linked to Attendance Page)
        attendanceChart = new Chart(document.getElementById('attendanceChart'), {
            type: 'pie',
            data: { 
                labels: ['Present', 'Absent'], 
                datasets: [{ 
                    data: [92, 8], 
                    backgroundColor: ['#198754', '#dc3545'], 
                    borderWidth: 0 
                }] 
            },
            options: { 
                onClick: (evt, elements) => {
                    if (elements.length > 0) {
                        window.location.href = 'attendance.html';
                    }
                },
                plugins: { 
                    legend: { position: 'bottom', labels: { color: textColor } },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}% (Click to view log)` } }
                } 
            }
        });

        // 3. CREDIT CHART (Informative Radar)
        creditChart = new Chart(document.getElementById('creditChart'), {
            type: 'radar',
            data: { 
                labels: ['Core', 'Elective', 'Language', 'Co-Curriculum', 'Research'], 
                datasets: [{ 
                    label: 'Credits Achieved', 
                    data: [18, 12, 6, 4, 10], 
                    backgroundColor: 'rgba(140, 21, 21, 0.2)', 
                    borderColor: '#8C1515',
                    pointBackgroundColor: '#8C1515'
                }] 
            },
            options: { 
                scales: { 
                    r: { 
                        grid: { color: gridColor }, 
                        angleLines: { color: gridColor }, 
                        pointLabels: { color: textColor, font: { weight: 'bold' } },
                        ticks: { display: false }
                    } 
                }, 
                plugins: { legend: { labels: { color: textColor } } } 
            }
        });
    }

    // Toggle Theme and Refresh Charts
    themeToggle.addEventListener('click', () => {
        const isLight = body.getAttribute('data-theme') === 'light';
        body.setAttribute('data-theme', isLight ? 'dark' : 'light');
        themeIcon.classList.replace(isLight ? 'bi-moon-fill' : 'bi-sun-fill', isLight ? 'bi-sun-fill' : 'bi-moon-fill');
        
        // Destroy old charts and recreate with new colors
        cgpaChart.destroy();
        attendanceChart.destroy();
        creditChart.destroy();
        initCharts();
    });

    // Initial Load
    initCharts();
</script>