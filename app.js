document.addEventListener('DOMContentLoaded', function(event){

  var userSearch = document.querySelector('#user-search');

  document.querySelector('#user-sub').addEventListener('click', function(){
    console.log('clicked');

    var query='https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=' + API_KEY + '&tags=' + userSearch.value;
    $.ajax({
      url: query,
      dataType: 'jsonp',        //required or will fail
      jsonp: 'jsoncallback',    //required or will fail
      success: function(response){
        console.log(response);

        //handlebars
        var source = document.querySelector('#photos-template').innerHTML;
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#photos-container');
        var html = template(response.photos.photo);
        templateContainer.innerHTML = html;


      }
    }) //end photo search ajax

  }); //end click event

}); //end document load
