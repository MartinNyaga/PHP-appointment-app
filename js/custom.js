function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

// Fetch data 
fetch('php/display_appointments.php')
    .then(response => response.json())
    .then(appointments => {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date and Time</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                ${appointments.map(appointment => `
                    <tr>
                        <td>${escapeHtml(appointment.name)}</td>
                        <td>${escapeHtml(appointment.email)}</td>
                        <td>${escapeHtml(appointment.datetime)}</td>
                        <td>${escapeHtml(appointment.notes)}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        document.getElementById('appointmentList').appendChild(table);
    })
    .catch(error => console.error('Error fetching data:', error));
