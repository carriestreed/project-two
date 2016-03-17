document.addEventListener('DOMContentLoaded', function(event){

  // //query for homepage featured galleries
  // var query='https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.search&api_key=' + API_KEY + '&sort=interestingness-desc';
  // $.ajax({
  //   url: query,
  //   dataType: 'json',
  //   success: function(response){
  //     console.log(response);
  //
  //     //handlebars
  //     var source = document.querySelector('#photos-template').innerHTML;
  //     var template = Handlebars.compile(source);
  //     var templateContainer = document.querySelector('#photos-container');
  //     var html = template(response.photos.photo);
  //     templateContainer.innerHTML = html;
  //
  //   }//end success
  // })//end photo search ajax




  //beginning on click event
  document.querySelector('#user-sub').addEventListener('click', function(){

    var userSearch = document.querySelector('#user-search');

    //move form box to header & resize
    var moveInput = document.querySelector('.form-container');
    moveInput.style.position = 'relative';
    moveInput.style.top = '-55px';
    moveInput.style.right = '400px';
    moveInput.style.zIndex = '200';
    moveInput.style.textAlign = 'right';
    document.querySelector('header').appendChild(moveInput);

    var inputAdj = document.querySelector('#user-search');
    inputAdj.style.fontSize = '12px';
    inputAdj.style.minWidth = '30%';
    inputAdj.style.padding = '5px';

    var buttonAdj = document.querySelector('#user-sub');
    buttonAdj.style.fontSize = '12px';
    buttonAdj.style.minWidth = '10%';
    buttonAdj.style.padding = '5px';


    //hide main homepage background
    var hideMainImg = document.querySelector('.homeBG').style.display = 'none';

    //hide featured galleries
    var hideGalleries = document.querySelector('#featured-container').style.display = 'none';

    //query for photo search
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

        //click to expand
        var photoLocation = response.photos.photo;
        for (var i = 0; i < photoLocation.length; i++){
          document.getElementById(photoLocation[i].id).addEventListener('click', function(){
            console.log(this, 'clicked');
          });
        }



      }//end success
    })//end photo search ajax
  });//end click event


});//end document load
