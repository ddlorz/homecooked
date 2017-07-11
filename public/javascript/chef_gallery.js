$(document).ready(function() {
    
    $(document).on('click', '.chef_link', function() {
        var chef_email = $(this).attr('id');
        var chef_id = chef_email.replace(/\@.*$/g, '');

        console.log(chef_id);
        
        var url = window.location.origin + '/chef_profile/' + chef_id;
        window.location = url;        
    });

     $(document).on('click', '#sign_out', function() { 
         var url = window.location.origin + '/'
         window.location = url;
    });
});