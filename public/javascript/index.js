$('#sign-up-form').on('click', '#sign-up-submit', function() {
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

$('#sign-in-form').on('click', '#sign-in-submit', function() {
    event.preventDefault();

    var user_email = $('#user_email').val();
    var user_password = $('#user_password').val();

    var user = {
        email: user_email,
        password: user_password
    };

    $.post('/api/sign_in', user, function(res) {
        console.log(res);
    });
});

$("#sign-in").click(function() {
    $("#sign-in-form").removeClass('hide');
    $("#sign-up-form").addClass('hide');
});

$("#sign-up").click(function() {
    $("#sign-up-form").removeClass('hide');
    $("#sign-in-form").addClass('hide');
});
