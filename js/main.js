$(document).ready(function() {
    const carousel = new Carousel($('.carousel'));
    const canvas = new Canvas($('#draw'));
    const countdown = new Countdown();
    const reservation = new Reservation(canvas, countdown);
    mapVelo.countdown = countdown;
});
