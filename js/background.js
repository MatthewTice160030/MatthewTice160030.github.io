var canvas_left = $("#bg_left")[0];
var canvas_right = $("#bg_right")[0];
var ctx_left = canvas_left.getContext("2d");
var ctx_right = canvas_right.getContext("2d");
var frameSkip = true, do_animation = true, columns, width, left_drops, right_drops, animation_id;
const drop_spawn_rate = 0.95;

function resizeCanvas() {
    cancelAnimationFrame(animation_id);

    // Detect mobile
    if(/Mobi|Android/i.test(navigator.userAgent)) { 
        do_animation = false;
    }
    else {
        do_animation = true;
        frameSkip = true;
    }

    // Get size of canvas
    let style_height = parseInt($("#main").css("height").slice(0, -2));
    let style_width = Math.ceil(parseFloat($("#main").css("margin-left").slice(0, -2)) + parseFloat($("#main").css("padding-left").slice(0, -2)));

    // Calculate column count to best fix drops
    var temp_width = 10, curr_columns = style_width / temp_width;
    columns = curr_columns, width = temp_width, diff = Math.abs(curr_columns - Math.round(curr_columns));
    while(diff !== 0 && temp_width < 25) {
        temp_width++;
        curr_columns = style_width / temp_width;
        if (Math.abs(curr_columns - Math.round(curr_columns)) <= diff) {
            columns = curr_columns;
            width = temp_width;
            diff = Math.abs(curr_columns - Math.round(curr_columns));
        }
    }

    left_drops = [], right_drops = [];

    // Initialize drops to random height aligned to grid
    for (var i = 0; i < columns; i++) {
        left_drops[i] = Math.floor(Math.random() * (style_height / width)) * width;
        right_drops[i] = Math.floor(Math.random() * (style_height / width)) * width;
    }

    // Adjust canvas for device and content sizing
    canvas_left.setAttribute("height", style_height);
    canvas_left.setAttribute("width", style_width);
    canvas_right.setAttribute("height", style_height);
    canvas_right.setAttribute("width", style_width);

    // Size canvas and content
    let navbar_height = parseInt($("#navbar").css("height").slice(0, -2));
    $("#bg_left").css({"margin-top": navbar_height});
    $("#bg_right").css({"margin-top": navbar_height});
    $("#main").css({"margin-top": navbar_height});
    
    // Begin animation loop
    if (do_animation) { 
        animation_id = requestAnimationFrame(draw);
    }
}

// Draw drops
function draw() {
    if (frameSkip) {
        for (var i = 0; i < columns; i++) {
            drawSquare(ctx_left, i * width, left_drops[i] * width, width);
            if (left_drops[i] * width > window.innerHeight && Math.random() > drop_spawn_rate) {
                left_drops[i] = 0;
                clearColumn(ctx_left, i * width, width);
            }
            left_drops[i]++;
        }
        for (var i = 0; i < columns; i++) {
            drawSquare(ctx_right, i * width, right_drops[i] * width, width);
            if (right_drops[i] * width > window.innerHeight && Math.random() > drop_spawn_rate) {
                right_drops[i] = 0;
                clearColumn(ctx_right, i*width, width);
            }
            right_drops[i]++;
        }    
    }
    
    frameSkip = !frameSkip;
    
    animation_id = requestAnimationFrame(draw);
}

function drawSquare(ctx, x, y, width, border_thickness = 2) {
    let step = 0.1, gamma = 1.0;
    for (var i = 0; gamma > 0; gamma -= step, i++) {
        // Remove previous
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y - (i * width), width, width);
        // Blue square
        ctx.fillStyle = `rgba(0, 255, 0, ${gamma})`; //`rgba(0, 191, 255, ${gamma})`;
        ctx.fillRect(x, y - (i * width), width, width);
        // Black fill
        ctx.fillStyle = "#000";
        ctx.fillRect(x + border_thickness, (y + border_thickness) - (i * width), width - (border_thickness * 2), width - (border_thickness * 2));
    }   
}

function clearColumn(ctx, x, width) {
    ctx.fillStyle = "#000";
    ctx.fillRect(x, 0, width, ctx.canvas.clientHeight);
}

$(document).ready(resizeCanvas);
$(window).bind("resize", resizeCanvas);