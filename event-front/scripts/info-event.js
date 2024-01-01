const url = 'http://localhost:8080/api/events';

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

const buttons = document.getElementById('buttons');

async function getEventById(eventId) {
    try {
        const response = await fetch(url + "/" + eventId);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getEventById:', error.message);
        alert('An error occurred. Please try again later.');
    }
}


async function loadEvent() {
    const eventData = await getEventById(eventId);

    const cardBody = document.getElementById('card-body');
    cardBody.innerHTML = "";

    const eventCard = `
    <h2 class="card-title">Event Information</h2>
    <div class="card mb-4">
        <div class="card-body">
            <p class="card-text"><strong>Event Name:</strong> ${eventData.eventName}</p>
            <p class="card-text"><strong>Description:</strong> ${eventData.description}</p>
            <p class="card-text"><strong>Date:</strong> ${eventData.eventDate.split('T')[0]}</p>
            <p class="card-text"><strong>Registration Fee:</strong> $${eventData.registrationFee}</p>
            <p class="card-text"><strong>Contact Email:</strong> ${eventData.contactEmail}</p>
            <p class="card-text"><strong>Contact Phone:</strong> ${eventData.contactPhone}</p>
            <p class="card-text"><strong>Event Type:</strong> ${eventData.eventType}</p>
            <p class="card-text"><strong>Event Status:</strong> ${eventData.eventStatus}</p>
        </div>
    </div>

 <div class="row">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Organizer</h4>
                <p class="card-text"><strong>Name:</strong> ${eventData.organizer.name}</p>
                <p class="card-text"><strong>Email:</strong> ${eventData.organizer.email}</p>
                <p class="card-text"><strong>Phone Number:</strong> ${eventData.organizer.phoneNumber}</p>
            </div>
        </div>
    </div>
    
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Venue</h4>
                <p class="card-text"><strong>Name:</strong> ${eventData.venue.name}</p>
                <p class="card-text"><strong>Description:</strong> ${eventData.venue.description}</p>
                <p class="card-text"><strong>Capacity:</strong> ${eventData.venue.capacity}</p>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Address</h4>
                <p class="card-text"><strong>Street:</strong> ${eventData.address.street}</p>
                <p class="card-text"><strong>City:</strong> ${eventData.address.city}</p>
                <p class="card-text"><strong>Country:</strong> ${eventData.address.country}</p>
                <p class="card-text"><strong>Zip Code:</strong> ${eventData.address.zipCode}</p>
            </div>
        </div>
    </div>
 </div> 
`;
    cardBody.innerHTML = eventCard;

    const isLoggedIn = getCookie('isLoggedIn') === 'true';

    if (isLoggedIn) {
        buttons.innerHTML = `
            <a href="edit.html?eventId=${eventId}" class="btn btn-primary">Update</a>
            <button class="btn btn-danger" id="btnDelete">Delete</button>
            <a href="events.html" type="button" class="btn btn-secondary">Cancel</a>`;
    } else {
        buttons.innerHTML = "";
    }
}


loadEvent();


async function deleteEventById(eventId) {
    try {
        const response = await fetch(url + "/" + eventId, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error in deleteEventById:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")) {
        const response = await deleteEventById(eventId);
        if (response) {
            goToPage("events.html");
        }
    }
}

buttons.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'btnDelete') {
        event.preventDefault();
        deleteEvent();
    }
});

function goToPage(pageName) {
    window.location.href = pageName;
}


function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}
