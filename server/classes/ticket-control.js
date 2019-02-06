const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.countReset();
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLast4() {
        return this.last4;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber, desk);

        this.last4.unshift(attendTicket);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1); //borra el ultimo
        }

        this.saveFile();

        return attendTicket;
    }

    countReset() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];

        console.log('Se ha inicializado el sistema');

        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}