Handlebars.registerHelper('toUpperCase', function(str) {
    return str.toUpperCase();
});

$(document).ready(function() {
    var source = $("#page-template").html();
    var template = Handlebars.compile(source);

    $(document.body).html(template);
});