$('#sign_up_form').on('click', '#sign_up_submit', function() {
    event.preventDefault();    

    if ( $('#first_name').val() && $('#last_name').val() && $('#email').val() 
    && $('#zipcode').val() && $('#phone_number').val() 
    && ($('#customer_radio').is(':checked') || $('#chef_radio').is(':checked'))) {

        $.post('/api/test_email', {email: $('#email').val()}, function(res) {
            if (res === 'taken') {
                //add modal to tell user to use another email
                console.log('Please use another email.')
            }
            else {
                var classification = '';
        
                if ($('#customer_radio').is(':checked')) {
                    classification = 'Consumer';
                }
                else if ($('#chef_radio').is(':checked')) {
                    classification = 'Chef';
                }

                var user = {
                    first_name: $('#first_name').val().trim(),
                    last_name: $('#last_name').val().trim(),
                    email: $('#email').val().trim(),
                    password: $('#email').val().trim(),
                    zip: $('#zipcode').val().trim(),
                    phone: $('#phone_number').val().trim(),
                    class: classification
                };

                $.post('/api/new_user', user, function(res) {

                });
            }
        });       
    }

    //add izimodal to message user about incomplete form
    else { console.log('Please fill every box.'); }
});
    

$('#sign_in_form').on('click', '#sign_in_submit', function() {
    event.preventDefault();

    if ($('#user_email').val() && $('#user_password').val()) {
        var user_email = $('#user_email').val().trim();
        var user_password = $('#user_password').val().trim();

        var user = {
            email: user_email,
            password: user_password
        };

        $.post('/api/sign_in', user, function(res) {
            if (res === 'incorrect') {
                console.log('User and Password are incorrect.');
                return;
            }
            var url = window.location.origin + '/chef_page'
            window.location = url;
        });
    } 

    //add izimodal to message user about incomplete form
    else { console.log('Please complete form.'); }   
});

$("#sign_in").click(function() {
    $("#sign_in_form").removeClass('hide');
    $("#sign_up_form").addClass('hide');
});

$("#sign_up").click(function() {
    $("#sign_up_form").removeClass('hide');
    $("#sign_in_form").addClass('hide');
});
