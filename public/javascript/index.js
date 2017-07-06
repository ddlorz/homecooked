$(document).ready(function() { 
    var config = {
        apiKey: "AIzaSyA0gZ_0vJGos6-N0ukNLmQxx93dw2UYFUU",
        authDomain: "homecooked-bb746.firebaseapp.com",
        databaseURL: "https://homecooked-bb746.firebaseio.com",
        projectId: "homecooked-bb746",
        storageBucket: "homecooked-bb746.appspot.com",
        messagingSenderId: "408118139177"
    };

    firebase.initializeApp(config);

    $('#sign_up_form').on('click', '#sign_up_submit', function() {
        event.preventDefault();    

        if ( $('#first_name').val() && $('#last_name').val() && $('#email').val() 
        && $('#zipcode').val() && $('#phone_number').val() 
        && ($('#customer_radio').is(':checked') || $('#chef_radio').is(':checked'))) {

            var classification = '';
    
            if ($('#customer_radio').is(':checked')) {
                classification = 'Consumer';
            }
            else if ($('#chef_radio').is(':checked')) {
                classification = 'Chef';
            }

            var user_email = $('#email').val().trim();
            var user_password = $('#password').val().trim();

            var user = {
                first_name: $('#first_name').val().trim(),
                last_name: $('#last_name').val().trim(),
                email: user_email,
                //password: user_password,
                zip: $('#zipcode').val().trim(),
                phone: $('#phone_number').val().trim(),
                class: classification
            };                    
            
            firebase.auth().createUserWithEmailAndPassword(user_email, user_password)
            .then(function() {
                console.log('No Error');  
                $.post('/api/new_user', user, function(res) {

                });   
            }).catch(function(error) {                
                console.log(error);      
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
            
            firebase.auth().signInWithEmailAndPassword(user_email, user_password)
            .then(function() {
                $.post('/api/sign_in', {user: user_email}, function(res) {                    
                    var url = window.location.origin + '/chef_page'
                    window.location = url;
                });
            }).catch(function(error) {
                console.log(error);           
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
});