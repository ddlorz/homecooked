$(document).ready(function() {
    var email = localStorage.getItem('email');
    
    $(document).on('click', '.chef_link', function() {
        console.log($(this).attr('id'));
        var chef_email = $(this).attr('id');
        var chef_id = chef_email.replace(/\@.*$/g, '');

        console.log(chef_id);

        localStorage.setItem('chef_email', chef_email);
        var url = window.location.origin + '/chef_profile/' + chef_id;
        window.location = url;        
    });
});