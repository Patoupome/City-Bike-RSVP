class Countdown {
    constructor () {
        $(window).unload(function(){
            sessionStorage.removeItem('Temps Restant')
          });
    }
    
    start(minutes = 5, seconds = 0) {
        this.stop();

        this.min = minutes;
        this.sec = seconds;

        this.storeAndDisplay(this.getText());
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    isStarted() {
        return !!this.intervalId;
    }

    update() {
        this.sec--;

        if (this.sec < 0) {
            this.sec = 59;
            this.min--;

            if (this.min < 0) {
                this.min = this.sec = 0;
                this.stop();
            }
        }

        this.storeAndDisplay(this.getText());
    }

    storeAndDisplay(value) {
        sessionStorage.setItem('Temps Restant', value);
        $('#countDown').text(value);
        if (value === "00:00" ) {
            sessionStorage.removeItem('Temps Restant');
            sessionStorage.removeItem('Adresse')
        }
    }

    getText() {
        var min = ("0" + this.min).slice(-2);
        var sec = ("0" + this.sec).slice(-2);
        return `${min}:${sec}`;
    }
}