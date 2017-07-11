$(document).ready(function() {

    $.post('/api/getChef', {}, function(res) {
        console.log(res);
        if (res.photo) {
            $('#chef_photo').attr('src', res.photo);
        }
        else {
            $('#chef_photo').attr('src', '/assets/placeholder.jpg');
        }
    });

    $(document).on('click', '#profile_save', function() {
        if ($('#photo').val() && $('#biography').val() && $('#price').val()) {
            var chef = {
                //email: email,
                photo: $('#photo').val(),
                biography: $('#biography').val().trim(),
                price: $('#price').val().trim()
            }
            
            $.post('/api/chef_profile', chef, function(res) {   
                $('#priceMeal').text($('#price').val());             
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

    $(document).on('click', '#sign_out', function() {
         var url = window.location.origin + '/'
         window.location = url;
    });

    $(document).on('click', '#photo_save', function() {
        $('#profile_picture_modal').modal('toggle');
        initUpload('profile_photo', 'photo');
    });

    $(document).on('click', '.save_button', function() {
        var menu_id = $(this).attr('id');
        var menu = {
            photo: 'menu_' + menu_id,
            photo_id: 'food_photo_' + menu_id,
            desc: 'desc_' + menu_id,
            price: 'price_' + menu_id,
            modal: '#food_' + menu_id + '_modal'
        }
        console.log(menu);
        $(menu.modal).modal('toggle');
        initUpload(menu.photo, 'menu', menu_id, menu.photo_id);
    });

    function initUpload(input, column_name, id, photo_id){
        const files = document.getElementById(input).files;
        const file = files[0];
        if(file == null){
            console.log('No file selected.');
        }
        console.log(file);
        getSignedRequest(file, column_name, id, photo_id);
    }

    function getSignedRequest(file, column_name, id, photo_id){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        console.log(xhr);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url, column_name, id, photo_id);
                }
                else{
                    console.log('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

    function uploadFile(file, signedRequest, url, column_name, id, photo_id){
        const xhr = new XMLHttpRequest();      
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){                      
                if (column_name === 'photo') {
                    $.post('/api/save_url', {url: url, col: column_name}, function(res) {});
                    document.getElementById('chef_photo').src = url;
                }
                else if (column_name === 'menu') {
                    $.post('/api/save_menu', {url: url, menu_id: id}, function(res) {});
                    document.getElementById(photo_id).src = url;
                }
            }
            else{
                console.log('Could not upload file.');
            }
          }
        };
        xhr.send(file);
    }
});