$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyA0gZ_0vJGos6-N0ukNLmQxx93dw2UYFUU",
        authDomain: "homecooked-bb746.firebaseapp.com",
        databaseURL: "https://homecooked-bb746.firebaseio.com",
        projectId: "homecooked-bb746",
        storageBucket: "homecooked-bb746.appspot.com",
        messagingSenderId: "408118139177"
    };

    firebase.initializeApp(config);

    $('#sign_up_form').on('click', '#submit_user', function () {
        event.preventDefault();

        if ($('#first_name').val() && $('#last_name').val() && $('#email').val()
            && $('#zipcode').val() && $('#phone_number').val()
            && ($('#customer_radio').is(':checked') || $('#chef_radio').is(':checked'))) {

            var classification = '';

            if ($('#customer_radio').is(':checked')) {
                classification = 'Consumer';
            }
            else if ($('#chef_radio').is(':checked')) {
                classification = 'Chef';
            }

            var user_email = $('#email').val().trim().toLowerCase();
            var user_password = $('#password').val().trim();

            var user = {
                first_name: $('#first_name').val().trim().toLowerCase(),
                last_name: $('#last_name').val().trim().toLowerCase(),
                email: user_email,
                zip: $('#zipcode').val().trim(),
                phone: $('#phone_number').val().trim(),
                class: classification
            };

            firebase.auth().createUserWithEmailAndPassword(user_email, user_password)
                .then(function () {
                    $.post('/api/new_user', user, function (res) {
                        if (classification === 'Consumer') {                            
                            var url = window.location.origin + '/chef_gallery'
                            window.location = url;
                        }
                        else if (classification === 'Chef') {
                            var url = window.location.origin + '/chef_form'
                            window.location = url;
                        }                        
                    });
                }).catch(function (error) {
                    console.log(error);
                });
        }

        //add izimodal to message user about incomplete form
        else { console.log('Please fill every box.'); }
    });


    $('#sign_in_form').on('click', '#sign-in-submit', function () {
        event.preventDefault();

        if ($('#user_email').val() && $('#user_password').val()) {
            var user_email = $('#user_email').val().trim().toLowerCase();
            var user_password = $('#user_password').val().trim();           

            firebase.auth().signInWithEmailAndPassword(user_email, user_password)
                .then(function () {
                    $.post('/api/sign_in', { email: user_email }, function (res) {
                        var url = window.location.origin + '/chef_gallery'
                        window.location = url;
                    });
                }).catch(function (error) {
                    console.log(error);
                });
        }

        //add izimodal to message user about incomplete form
        else { console.log('Please complete form.'); }
    });

    $("input[name='phone']").keyup(function() {
        $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3"));
    });

    $("#sign_in").click(function () {
        $("#sign_in_form").removeClass("hide");
        $("#sign_in_heading").removeClass("hide");
        $("#dont_have_acct").removeClass("hide");
        $("#sign_up_form").addClass("hide");
        $("#sign_up_heading").addClass("hide");
        $("#have_an_acct").addClass("hide");
    });

    $("#sign_up").click(function () {
        $("#sign_up_form").removeClass("hide");
        $("#sign_up_heading").removeClass("hide");
        $("#have_an_acct").removeClass("hide");
        $("#sign_in_form").addClass("hide");
        $("#sign_in_heading").addClass("hide");
        $("#dont_have_acct").addClass("hide");
    });


});