jQuery.easing.def = "easeInOutQuad";

$('.navbar .nav-link').click(function(event) {
    var navbarOffset = parseInt($("#navbar").css("height").slice(0, -2));
    event.preventDefault();

    $("html, body").animate({
        scrollTop: $(this.hash).offset().top - navbarOffset
    }, 600, function(){
        window.location.hash = this.hash;
    });

    if (this.hash !== "#projects") {
        //scrollBy(0, -offset);
    }
});