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

//Also when updating a record, you can do so on the table itself
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
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                ${appointments.map(appointment => `
                <tr id="row-${appointment.id}">
                <td><span id="name-${appointment.id}">${escapeHtml(appointment.name)}</span><input type="text" id="edit-name-${appointment.id}" class="edit-field" style="display:none;"></td>
                <td><span id="email-${appointment.id}">${escapeHtml(appointment.email)}</span><input type="text" id="edit-email-${appointment.id}" class="edit-field" style="display:none;"></td>
                <td><span id="datetime-${appointment.id}">${escapeHtml(appointment.datetime)}</span><input type="text" id="edit-datetime-${appointment.id}" class="edit-field" style="display:none;"></td>
                <td><span id="notes-${appointment.id}">${escapeHtml(appointment.notes)}</span><input type="text" id="edit-notes-${appointment.id}" class="edit-field" style="display:none;"></td>
                <td>
                    <button class="edit-button" onclick="toggleEdit(${appointment.id})">Edit</button>
                    <button class="update-button" onclick="updateAppointment(${appointment.id})" style="display:none;">Update</button>
                </td>
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

function toggleEdit(id) {
    const fields = ['name', 'email', 'datetime', 'notes'];

    fields.forEach(field => {
        const spanId = `${field}-${id}`;
        const inputId = `edit-${field}-${id}`;

        document.getElementById(spanId).style.display = 'none';
        document.getElementById(inputId).style.display = 'inline-block';
    });

    // Toggle visibility of buttons
    document.querySelector(`#row-${id} .edit-button`).style.display = 'none';
    document.querySelector(`#row-${id} .update-button`).style.display = 'inline-block';
}

function updateAppointment(id) {
    const fields = ['name', 'email', 'datetime', 'notes'];
    const updatedData = {};

    fields.forEach(field => {
        const inputId = `edit-${field}-${id}`;
        updatedData[field] = document.getElementById(inputId).value;
    });

    fetch('php/update_appointment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            data: updatedData,
        }),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // If the update is successful, refresh the table
            getData();
        } else {
            console.error('Error updating appointment:', result.error);
        }
    })
    .catch(error => console.error('Error updating appointment:', error));
}


