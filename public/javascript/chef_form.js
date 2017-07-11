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
        initUpload();
    });

    function initUpload(){
      const files = document.getElementById('profile_photo').files;
      const file = files[0];
      //var file = $('#profile_photo').prop('files');
      if(file == null){
        console.log('No file selected.');
      }
      console.log(file);
      getSignedRequest(file);
    }

    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      console.log(xhr);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            console.log('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

    function uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();      
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            $.post('/api/save_url', {url: url}, function(res) {});  
            document.getElementById('chef_photo').src = url;
          }
          else{
            console.log('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }
});