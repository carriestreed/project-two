document.addEventListener('DOMContentLoaded', function(event){

  var userSearch = document.querySelector('#user-search');

  document.querySelector('#user-sub').addEventListener('click', function(){
    console.log('clicked');



    //move form box to header
    var moveInput = document.querySelector('.form-container');
    moveInput.style.top = '7px';
    moveInput.style.right = '0px';
    moveInput.style.zIndex = '200';
    moveInput.style.textAlign = 'right';
    document.querySelector('header').appendChild(moveInput);

    var inputAdj = document.querySelector('#user-search');
    inputAdj.style.fontSize = '12px';
    inputAdj.style.minWidth = '30%';

    var buttonAdj = document.querySelector('#user-sub');
    buttonAdj.style.fontSize = '12px';
    buttonAdj.style.minWidth = '10%';

    //hide homepage background
    var hideMainImg = document.querySelector('.homeBG').style.display = 'none';



    var query='https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.search&api_key=' + API_KEY + '&sort=interestingness-desc&tags=' + userSearch.value;
    $.ajax({
      url: query,
      dataType: 'json',
      success: function(response){
        console.log(response);

        //handlebars
        var source = document.querySelector('#photos-template').innerHTML;
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#photos-container');
        var html = template(response.photos.photo);
        templateContainer.innerHTML = html;


      }//end success
    })//end photo search ajax

  });//end click event

});//end document load
