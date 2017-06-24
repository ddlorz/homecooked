$('#sign_form').on('click', '#submit_user', function() {
    event.preventDefault();

    var classification = '';
    if ($('#cook_radio').val()) {
        classification = 'cook';
    }
    else if ($('#eater_radio').val()) {
        classification = 'eater';
    }

    var user = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#email').val(),
        password: $('#email').val(),
        zip: $('#zipcode').val(),
        phone: $('#phone_number').val(),
        class: classification
    };
   $.post('/api/new_user', user, function(res) {

   });

});

$("#sign-in").click(function{
    $("#sign-in-form").show();
    $("#sign-up-form").hide();
});
