//loader image from http://www.icbproperties.com/assets/img/loading.gif.pagespeed.ce.ma8Xt5OQ3G.gif


document.addEventListener('DOMContentLoaded', function(event){

  //global variable
  var userSearch;
  /////////////////

  //beginning user search on click event
  document.querySelector('#user-sub').addEventListener('click', function(){
    setupWindow();
    userSearch = document.querySelector('#user-search').value;
    querySearch(userSearch);
  });//end click event

  //beginning featured gallery on click event
  var featuredPlaces = document.querySelectorAll('.featured-place');
  for (var i = 0; i < featuredPlaces.length; i++){
    document.getElementById(featuredPlaces[i].id).addEventListener('click', function(that){
      console.log(this.id);
      if (this.id === 'namibia'){
        userSearch = 'namibia';
      }
      if (this.id === 'bolivia'){
        userSearch = 'bolivia';
      }
      if (this.id === 'peru'){
        userSearch = 'peru';
      }
      if (this.id === 'tokyo'){
        userSearch = 'tokyo';
      }
      if (this.id === 'singapore'){
        userSearch = 'singapore';
      }
      if (this.id === 'iceland'){
        userSearch = 'iceland';
      }
      setupWindow();
      querySearch(userSearch);
    })//end click event
  }//end for loop

 //  inputBox.addEventListener("keydown", function(e){ //help from kristyn!!!
 //   if (e.keyCode == 13) {
 //     e.preventDefault();
 //     querySearch();
 //   };
 // });

  //query for photo search
  function querySearch(el){
    $.ajax({ /* ajax call for user search */
      url: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.search&api_key=' + API_KEY + '&sort=interestingness-desc&group_id=41425956%40N00&tags=' + el,
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
  }

  //sets up positioning for popup window
  function setupWindow(){

    //click logo to reload
    document.querySelector('#logo').addEventListener('click', function(){
      location.reload();
    }); //end click logo to reload

    //move form box to header & resize
    var moveInput = document.querySelector('.form-container');
    moveInput.style.position = 'absolute';
    moveInput.style.textAlign = 'right';
    moveInput.style.width = '70%';
    moveInput.style.top = '-4px';
    moveInput.style.right = '20px';
    moveInput.zIndex = '100';
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

    //gallery loading
    document.querySelector('#photos-container').innerHTML =
    '<div class="waiting" style="display:block;">'
     + '"Not all who wander are lost..."'
     +'</div>';
   }//end popup window setup


  //generates content for popup window
  function generateContent(el){
    console.log('passed in', el);

    var photoId = el[0].id;

    $.ajax({ /*ajax call for sizes*/
      url: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.getSizes&api_key=' + API_KEY + '&photo_id=' + photoId,
      dataType: 'json',
      success: function(response){

        //handlebars for popup window setup
        var source = document.querySelector('#popup-template').innerHTML;
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#photo-popup');
        var html = template(response.sizes.size[7]);
        templateContainer.innerHTML = html;

        //displays popup window
        document.querySelector('#photo-popup').style.display = 'block';

        //map loading
        document.querySelector('#map').innerHTML =
        "<p class='waiting' style='top:2em'>locating this photo on a map...</p>";

        //description loading
        document.querySelector('#photo-desc').innerHTML =
        '<div style="display:block;">'
         + 'A description for this sweeeet photo <em>should</em> load soon...'
         + '<br><br>'
         + "In the meantime, here's an inspirational quote from Mark Twain:"
         + '<br><em>'
         + '“Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do."'
         + '</em><br><br><strong>'
         + 'Let that just sink in a moment.'
         + '</strong></div>';

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

        //handlebars for description
        var source = document.querySelector('#photo-desc-temp').innerHTML;
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#photo-desc');
        var html = template(response.photo);
        templateContainer.innerHTML = html;

        //handlebars for map
        var mapSource = document.querySelector('#map-temp').innerHTML;
        console.log(mapSource);
        var mapTemplate = Handlebars.compile(mapSource);
        console.log(mapTemplate);
        var mapTemplateContainer = document.querySelector('#map');
        console.log(mapTemplateContainer);
        var mapHTML = mapTemplate(response.photo);
        console.log(mapHTML);
        mapTemplateContainer.innerHTML = mapHTML;

      } //end success
    });//end ajax call for descriptions
  }//end generate content function





});//end document load

//TODO
//pause scrolling behind div popup window
//attempt to connect google auto fill
//add photo markers on map
//link to other tags on popup window
//display amount of views
//get external links to open in new tab
//debug why description lags so much
//enter to submit
//make popup responsive
//make homepage responsive
//randomize quotes that display upon waiting
//fix text animation so color changes from left to right
