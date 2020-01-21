const INTERVAL_TIME = 5000;

class Carousel {
    constructor(jCarousel) {
        if (!(jCarousel instanceof jQuery)) {
            throw 'Incoming argument should be jQuery object.';
        } else if (jCarousel.length != 1) {
            throw `Incoming argument should represent single element. Currently selected ${jCarousel.length}.`;
        }
        this.carousel = jCarousel;
        this.carousel.children().wrapAll('<div class="carousel-body">');
        this.container = this.carousel.children('.carousel-body');

        var leftArrow = $(`
        <div class="arrow-box arrow-box-left">
            <div class="arrow-container prev">
                <div class="arrow">
                </div>
            </div>
        </div>`);
        this.carousel.append(leftArrow);
        leftArrow.click(() => {
            this.restart();
            this.prev();
        });

        $(document).keydown((e) => {
            if (e.which ==  37) {
                this.restart();
                this.prev();
            }
        })
        
        var rightArrow = $(`
        <div class="arrow-box arrow-box-right">
            <div class="arrow-container next">
                <div class="arrow left">
                </div>
            </div>
        </div>`);
        this.carousel.append(rightArrow);
        rightArrow.click(() => {
            this.restart();   
            this.next();
        });

        $(document).keydown((e) => {
            if (e.which ==  39) {
                this.restart();
                this.next();
            }
        })

        var toggleBtn = $(`
        <div class = "btn-container">
            <div class="btn-border">
                <button class="btn-toggle stop">
                </button>
            </div>
        </div>`);
        this.carousel.append(toggleBtn);
        toggleBtn.click(e => {
            this.toggle(e);
        });

        // Initiate a start of carousel
        this.container.children(".active").fadeIn(400);
        this.isAutoPlay = true;
        this.restart();
    }

    switchPage (prev, next) {
        prev.fadeOut(300).removeClass('active');
        next.fadeIn(400).addClass('active');
    }

    /**
     * Resets carousel timer to 0
     */
    restart() {
        if (this.interval !== undefined) {
            clearInterval(this.interval);

            if (this.isAutoPlay) {
                this.interval = setInterval(() => this.next(), INTERVAL_TIME);
            } else {
                this.interval = undefined;
            }
        } else if (this.isAutoPlay) {
            this.interval = setInterval(() => this.next(), INTERVAL_TIME);
        }
    }

    toggle(e) {
        this.isAutoPlay = !this.isAutoPlay;
        this.restart();

        var btn = $(e.target);
        if (this.isAutoPlay) {
            btn.removeClass("play").addClass("stop");
           // btn.text("Stop");
        } else {
            btn.removeClass("stop").addClass("play");
           // btn.text("Play");
        }
        
    }

    next() {
        var activeElm = this.container.children('.active');
        var nextElm = activeElm.next();
        
        if(nextElm.length > 0) {
            this.switchPage(activeElm, nextElm);
        } else {
            this.switchPage(activeElm, this.container.children(":first"));
        }
    }

    prev() {
        var activeElm = this.container.children('.active');
        var prevElm = activeElm.prev();
 
        if(prevElm.length > 0) {
            this.switchPage(activeElm, prevElm)
        } else {
            this.switchPage(activeElm, this.container.children(":last"));
        }
    }

    
}
