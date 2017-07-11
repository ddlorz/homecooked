$(document).ready(function() {
     $(document).on('click', '#send_message', function() {
         $('#message_modal').modal('toggle');
         $('#email_subject').val('');
         $('#user_message').val('');
         $.post('/api/send_mail', {}, function(res) {});
    });

    $(document).on('click', '#sign_out', function() {
         var url = window.location.origin + '/'
         window.location = url;
    });    
});