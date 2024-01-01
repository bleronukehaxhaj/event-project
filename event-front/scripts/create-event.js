const url = 'http://localhost:8080/api/events';

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


const btnSave = document.getElementById('btnSave');


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


async function createEvent(event) {
    try {
        const response = await fetch(url, {
            method: 'POST',
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
        console.error('Error in createEvent:', error.message);
        alert('An error occurred. Please try again later.');
    }
}


async function saveEvent() {
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
    const response = await createEvent(event);
    if (response) {
        goToPage("events.html");
    }
}

function goToPage(pageName) {
    window.location.href = pageName;
}


getAllEventStatuses();
getAllEventTypes();
btnSave.addEventListener('click', (event) => {
    event.preventDefault();
    saveEvent();
});



