document.addEventListener('DOMContentLoaded', function(event){

  //beginning on click event
  document.querySelector('#user-sub').addEventListener('click', function(){

    var userSearch = document.querySelector('#user-search');

    //click logo to reload
    document.querySelector('#logo').addEventListener('click', function(){
      location.reload();
    });

    //move form box to header & resize
    var moveInput = document.querySelector('.form-container');
    moveInput.style.position = 'relative';
    moveInput.style.top = '-55px';
    moveInput.style.left = '0px';
    moveInput.style.right = '10px';
    moveInput.style.zIndex = '200';
    moveInput.style.width = '96%';
    moveInput.style.textAlign = 'right';
    document.querySelector('header').appendChild(moveInput);

    var inputAdj = document.querySelector('#user-search');
    inputAdj.style.fontSize = '12px';
    inputAdj.style.minWidth = '30%';
    inputAdj.style.padding = '5px';

    var buttonAdj = document.querySelector('#user-sub');
    buttonAdj.style.fontSize = '12px';
    buttonAdj.style.minWidth = '6%';
    buttonAdj.style.padding = '5px';

    //hide main homepage background
    document.querySelector('.homeBG').style.display = 'none';

    //hide featured galleries
    document.querySelector('#featured-container').style.display = 'none';

    //query for photo search
    $.ajax({ /* ajax call for search */
      url: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.search&api_key=' + API_KEY + '&sort=interestingness-desc&group_id=41425956%40N00&tags=' + userSearch.value,
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
            var photoObject = [this];
            generateContent(photoObject);
          });//end click event
        }//end for loop

      }//end success
    })//end photo search ajax
  });//end click event


  //generates popup window content
  function generateContent(el){
    console.log('passed in', el);
    var photoId = el[0].id;

    $.ajax({ /*ajax call for sizes*/
      url: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.getSizes&api_key=' + API_KEY + '&photo_id=' + photoId,
      dataType: 'json',
      success: function(response){

        //handlebars
        var source = document.querySelector('#popup-template').innerHTML;
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#photo-popup');
        var html = template(response.sizes.size[7]);
        templateContainer.innerHTML = html;

        //displays popup window
        document.querySelector('#photo-popup').style.display = 'block';

        //close window on click
        document.querySelector('span').addEventListener('click', function(){
          document.querySelector('#photo-popup').style.display = 'none';
        });//end close on click

      }//end success
    });//end photo-size ajax call

    $.ajax({ /*ajax call for descriptions*/
      url: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.getInfo&api_key=' + API_KEY + '&photo_id=' + photoId,
      dataType: 'json',
      success: function(response){
        console.log(response);
        console.log(response.photo.description);
        console.log(response.photo.title);
      }//end success
    });//end ajax call for descriptions

  }//end generate content function





});//end document load
