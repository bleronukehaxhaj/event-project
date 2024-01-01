const url = 'http://localhost:8080/api/events';


async function getAllEvents() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getAllEvents:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function loadEvents() {
    const data = await getAllEvents();

    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = "";

    data.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('col-md-6', 'mb-4');
        eventCard.innerHTML = `
          <div class="card">
            <div class="card-body">
                <h5 class="card-title">${event.eventName}</h5>
                <div class="row">
                    <div class="col-md-6">
                        <p class="card-text"><strong>Date:</strong> ${event.eventDate.split('T')[0]}</p>
                        <p class="card-text"><strong>Time:</strong> ${event.eventDate.split('T')[1]}</p>
                        <p class="card-text"><strong>Registration Fee:</strong> $${event.registrationFee}</p>
                    </div>
                    <div class="col-md-6">
                        <p class="card-text"><strong>Venue:</strong> ${event.venue.name}</p>
                        <p class="card-text"><strong>Event Type:</strong> ${event.eventType}</p>
                        <p class="card-text"><strong>Event Status:</strong> ${event.eventStatus}</p>
                    </div>
                </div>
                <a href="./info.html?eventId=${event.id}" class="btn btn-primary mt-3">More Info</a>
            </div>
        </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

loadEvents();