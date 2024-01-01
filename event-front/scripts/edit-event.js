const url = 'http://localhost:8080/api/events';

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

const inputEventName = document.getElementById('inputEventName');
const textAreaDescription = document.getElementById('textAreaDescription');
const inputDate = document.getElementById('inputDate');
const inputRegistrationFee = document.getElementById('inputRegistrationFee');
const inputContactEmail = document.getElementById('inputContactEmail');
const inputContactPhone = document.getElementById('inputContactPhone');
const selectEventType = document.getElementById('selectEventType');
const selectEventStatus = document.getElementById('selectEventStatus');

const inputOrganizerName = document.getElementById('inputOrganizerName');
const inputOrganizerEmail = document.getElementById('inputOrganizerEmail');
const inputOrganizerPhone = document.getElementById('inputOrganizerPhone');

const inputVenueName = document.getElementById('inputVenueName');
const textAreaVenueDescription = document.getElementById('textAreaVenueDescription');
const inputVenueCapacity = document.getElementById('inputVenueCapacity');

const inputAddressStreet = document.getElementById('inputAddressStreet');
const inputAddressCity = document.getElementById('inputAddressCity');
const inputAddressCountry = document.getElementById('inputAddressCountry');
const inputAddressZipCode = document.getElementById('inputAddressZipCode');


const btnUpdate = document.getElementById('btnUpdate');

async function updateEvent(eventId, event) {
    try {
        const response = await fetch(url + "/" + eventId, {
            method: 'PUT',
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error in updateEvent:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function getEventById(eventId) {
    try {
        const response = await fetch(url + "/" + eventId);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getEventById:', error.message);
        alert('An error occurred. Please try again later.')
    }
}


function getAllEventTypes() {
    fetch(url + "/event-type")
        .then(response => response.json())
        .then(eventTypes => {
            const eventTypeDropdown = document.getElementById('selectEventType');
            eventTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.text = type;
                eventTypeDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching event types:', error));
}

function getAllEventStatuses() {
    fetch(url + "/event-status")
        .then(response => response.json())
        .then(eventStatuses => {
            const eventStatusDropdown = document.getElementById('selectEventStatus');
            eventStatuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.text = status;
                eventStatusDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching event statuses:', error));
}


async function modifyEvent() {
    const event = {
        id: null,
        eventName: inputEventName.value,
        description: textAreaDescription.value,
        eventDate: inputDate.value,
        registrationFee: parseFloat(inputRegistrationFee.value),
        contactEmail: inputContactEmail.value,
        contactPhone: inputContactPhone.value,
        eventType: selectEventType.value,
        eventStatus: selectEventStatus.value,
        organizer: {
            id: null,
            name: inputOrganizerName.value,
            email: inputOrganizerEmail.value,
            phoneNumber: inputOrganizerPhone.value,
        },
        venue: {
            id: null,
            name: inputVenueName.value,
            description: textAreaVenueDescription.value,
            capacity: parseInt(inputVenueCapacity.value),
        },
        address: {
            id: null,
            street: inputAddressStreet.value,
            city: inputAddressCity.value,
            country: inputAddressCountry.value,
            zipCode: inputAddressZipCode.value,
        },
    };
    const response = await updateEvent(eventId, event);
    if (response) {
        goToPage("events.html");
    }
}


async function loadEventForm() {
    const event = await getEventById(eventId);

    inputEventName.value = event.eventName;
    textAreaDescription.value = event.description;
    inputDate.value = event.eventDate;
    inputRegistrationFee.value = event.registrationFee;
    inputContactEmail.value = event.contactEmail;
    inputContactPhone.value = event.contactPhone;
    selectEventType.value = event.eventType;
    selectEventStatus.value = event.eventStatus;

    inputOrganizerName.value = event.organizer.name;
    inputOrganizerEmail.value = event.organizer.email;
    inputOrganizerPhone.value = event.organizer.phoneNumber;

    inputVenueName.value = event.venue.name;
    textAreaVenueDescription.value = event.venue.description;
    inputVenueCapacity.value = event.venue.capacity;

    inputAddressStreet.value = event.address.street;
    inputAddressCity.value = event.address.city;
    inputAddressCountry.value = event.address.country;
    inputAddressZipCode.value = event.address.zipCode;

}

function goToPage(pageName) {
    window.location.href = pageName;
}

btnUpdate.addEventListener('click', (event) => {
    event.preventDefault();
    modifyEvent();
});

getAllEventStatuses();
getAllEventTypes();
loadEventForm();