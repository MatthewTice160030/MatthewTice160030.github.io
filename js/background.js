var canvas = $("#bg")[0];
var ctx = canvas.getContext("2d");
var width = 20, left_drops, right_drops;

function resizeCanvas() {
    // Initialize drops
    let main = $("#main")[0];
    columns = Math.floor((getComputedStyle(main).getPropertyValue("margin-left").slice(0, -2) + getComputedStyle(main).getPropertyValue("padding-left").slice(0, -2)) / width);
    left_drops = [], right_drops = [];

    for (var i = 0; i < columns; i++) {
        left_drops[i] = 0;
        right_drops[i] = 0;
    }

    // Adjust canvas for device 
    let dpi = window.devicePixelRatio;
    let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

    // Size canvas
    let navbar_height = getComputedStyle($("#navbar")[0]).getPropertyValue("height");
    $("#bg").css({top: `${navbar_height}`});
}

// Draw drops
function draw() {
    for (var i = 0; i < columns; i++) {
        // Draw blue border
        ctx.fillStyle = "#00BFFF";
        ctx.fillRect(i * width, left_drops[i] * width, width, width);
        // Draw inner black
        ctx.fillStyle = "#000";
        ctx.fillRect(i * width + 1, left_drops[i] * width + 1, width - 3, width - 3);
        if (left_drops[i] * width > window.innerHeight && Math.random() > 0.975) {
            left_drops[i] = 0;
        }

        left_drops[i]++;
    }
    for (var i = 0; i < columns; i++) {
        // Draw blue border
        ctx.fillStyle = "#00BFFF";
        ctx.fillRect(window.innerWidth - i * width, right_drops[i] * width, width, width);
        // Draw inner black
        ctx.fillStyle = "#000";
        ctx.fillRect(window.innerWidth - (i * width + 1), right_drops[i] * width + 1, width - 3, width - 3);
        if (right_drops[i] * width > window.innerHeight && Math.random() > 0.975) {
            right_drops[i] = 0;
        }

        right_drops[i]++;
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas, false);

setInterval(draw, 33);