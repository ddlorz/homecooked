$(document).on('click', '#submit_chef_form', function() {
    console.log('you clicked me');
    if ($('#biographies').val() && $('#specialties').val() && $('#biographies').val() && $('#restrictions').val() && $('#radius').val()) {

        $.post('/api/chef_profile', {}, function(res) {

        });

    }
    else {

    }

});