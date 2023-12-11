function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

function getData(){
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${appointments.map(appointment => `
                    <tr>
                        <td>${escapeHtml(appointment.name)}</td>
                        <td>${escapeHtml(appointment.email)}</td>
                        <td>${escapeHtml(appointment.datetime)}</td>
                        <td>${escapeHtml(appointment.notes)}</td>
                        <td><button class="delete-button" onclick="deleteAppointment(${appointment.id})">Delete</button></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        document.getElementById('appointmentList').innerHTML = '';
        document.getElementById('appointmentList').appendChild(table);
    })
    .catch(error => console.error('Error fetching data:', error));
}
    // Function to delete an appointment 
function deleteAppointment(id) {
    // Send a request to the server to delete the appointment
    fetch('php/delete_appointment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // If the deletion is successful, refresh the table
            getData();
        } else {
            console.error('Error deleting appointment:', result.error);
        }
    })
    .catch(error => console.error('Error deleting appointment:', error));
}



getData();