class Canvas {
    constructor (jCanvas) {
        if (!(jCanvas instanceof jQuery)) {
            throw 'Incoming argument should be jQuery object.';
        } else if (jCanvas.length != 1) {
            throw `Incoming argument should represent single element. Currently selected ${jCanvas.length}.`;
        }

        this.canvas = jCanvas;
        this.ctx = jCanvas[0].getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#000000";

        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.canvas.mousedown( (e) => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });
        this.canvas.mousemove((e) => this.draw(e));
        this.canvas.mouseup( () => this.isDrawing = false);
        this.canvas.mouseout(() => this.isDrawing = false);

        this.times = 0;
    }

    draw(e) {
        // stop the function if they are not mouse down
        if(!this.isDrawing) return;
        //listen for mouse move event
        //console.log(e);
        this.times++;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }

    /**
     * Users put at least 15 dots on my canvas
     */
    isFilled() {
        return this.times >= 15;
    }
}