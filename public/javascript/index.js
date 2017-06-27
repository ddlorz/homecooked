$('#sign_up_form').on('click', '#sign_up_submit', function() {
    event.preventDefault();

    var classification = '';
    if ($('#chef_radio').val()) {
        classification = 'cook';
    }
    else if ($('#customer_radio').val()) {
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

   $.post('/api/new_user', user, function(res) {});
});

$('#sign_in_form').on('click', '#sign_in_submit', function() {
    event.preventDefault();

    var user_email = $('#user_email').val();
    var user_password = $('#user_password').val();

    var user = {
        email: user_email,
        password: user_password
    };

    $.post('/api/sign_in', user, function(res) {
        if (res === 'incorrect') {
           console.log('User and Password are incorrect.');
           return;
        }
        console.log(res);
        var url = window.location.href + 'chef_page'
        console.log(url);
        window.location = url;
    });
});

$("#sign_in").click(function() {
    $("#sign_in_form").removeClass('hide');
    $("#sign_up_form").addClass('hide');
});

$("#sign-up").click(function() {
    $("#sign_up_form").removeClass('hide');
    $("#sign_in_form").addClass('hide');
});
