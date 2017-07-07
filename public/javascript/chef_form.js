$(document).ready(function() {
    var email = localStorage.getItem('email');

    $.post('/api/getChef', {email: email}, function(res) {

        first_name = res.first_name.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        last_name = res.first_name.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        $('#firstName').html('First Name: ' + first_name);
        $('#lastName').html('Last Name: ' + last_name);
        $('#zipCode').html('Zip Code: ' + res.zip);
        console.log(res);
    });

    $(document).on('click', '#profile_save', function() {
        console.log('you clicked me');
        if ($('#photo').val() && $('#biography').val() && $('#price').val()) {
            var chef = {
                email: email,
                photo: $('#photo').val(),
                biography: $('#biography').val().trim(),
                price: $('#price').val().trim()
            }
            
            $.post('/api/chef_profile', chef, function(res) {   
                $('#priceMeal').text('Price Per Meal: $' + $('#price').val());             
                $('#photo').empty();
                $('#biography').empty();
                $('#price').empty();                
                $('#chef_about_modal').modal('toggle');
            });
        }
        else {
            console.log('Please complete the form.');
        }

    });
});