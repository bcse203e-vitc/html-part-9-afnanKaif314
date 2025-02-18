
let appointmentList = JSON.parse(localStorage.getItem('appointments')) || [];

document.addEventListener('DOMContentLoaded', function () {
    displayAppointments();
});

function openForm(service) {
    document.getElementById('appointmentForm').style.display = 'block';
    document.getElementById('service').value = service;
}

function closeForm() {
    document.getElementById('appointmentForm').style.display = 'none';
}

document.getElementById('appointmentFormFields').addEventListener('submit', function (e) {
    e.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let service = document.getElementById('service').value;
    let datetime = document.getElementById('datetime').value;
    let requests = document.getElementById('requests').value;
    let terms = document.getElementById('terms').checked;

    if (!name || !email || !phone || !datetime || !terms) {
        alert("Please fill all required fields.");
        return;
    }

    let appointment = {
        name,
        email,
        phone,
        service,
        datetime,
        requests,
        status: 'Pending'
    };

    appointmentList.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointmentList));
    
    closeForm();
    displayAppointments();
    showConfirmation(name, service, datetime);
});

function displayAppointments() {
    let appointmentsTable = document.querySelector('#appointmentsTable tbody');
    appointmentsTable.innerHTML = '';
    
    appointmentList.forEach(function (appointment) {
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.datetime}</td>
            <td>${appointment.status}</td>
        `;
        
        appointmentsTable.appendChild(row);
    });
}

function showConfirmation(name, service, datetime) {
    let confirmationMessage = `Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`;
    document.getElementById('confirmationMessage').innerText = confirmationMessage;
    document.getElementById('confirmationPopup').style.display = 'block';
}

function closeConfirmation() {
    document.getElementById('confirmationPopup').style.display = 'none';
}

