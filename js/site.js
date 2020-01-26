$('.navbar .nav-link').click(function(event) {
    var offset = parseInt($("#navbar").css("height").slice(0, -2));
    event.preventDefault();

    var element = $($(this).attr('href'))[0];
    element.scrollIntoView(true);
    if (element.id !== "projects") {
        scrollBy(0, -offset);
    }
});