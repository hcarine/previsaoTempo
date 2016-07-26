$('#getClime').on('submit', function(e) {
    e.preventDefault();
    // var city = document.getElementById("city").value.toLowerCase().trim();
    // var state = $("#state").val().toLowerCase();
    var city = "blumenau";
    var state = "santacatarina";
    getClima(city,state);
});

function init(){
    var city = "blumenau";
    var state = "santacatarina";
    getClima(city,state);
}


function getClima(city,state){
    $.ajax({
        type: "GET",
        url:'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +',' + state +',br&mode=json&units=metric&cnt=7&appid=fece2aa20ad50047740813901a13081a',
        dataType: 'json',
        success: updatePrevision,
        error: messageErro
    });
}

function updatePrevision(dados) {
    var min = dados.list[0].temp.min;
    var max = dados.list[0].temp.min;
    updateValuesToday(min,max);
    updateCityName(dados.city.name);

    
    var showImage = isHotWeekend(dados.list);
    showIsBeachDay(showImage);
    //createGraphic(dados);
    
}

function messageErro(message){
    console.log("infelismente ocorreu um erro, verifique o nome da cidade e veja se corresponde ao estado");
}

function updateValuesToday(min, max){
  document.getElementById("todayMin").value = min;
  document.getElementById("todayMax").value = max;
}

function updateCityName(name){
   $('#cityName').html("Previsão para a cidade de: " + name);
}


function createGraphic(dados){
    
}

function isHotWeekend(days){
    var weekend = [];
    for(var i=0; i< days.length; i++){
        var theDate = new Date(days[i].dt * 1000);
        var day = theDate.getDay();
       if((day == 6) || (day == 0)){
           weekend[weekend.length] = days[i].temp.max;
       }
    }
    if(isDayhot(weekend[0]) || isDayhot(weekend[1]) ){
      return true;
    }
    return false;
}

function isDayhot(day) {
    return day > 25 ? true : false;
}

function showIsBeachDay(value){
    var icon;
    if(value)
      icon = 'icon-happy-smiley-streamline';
    
    else
        icon = 'icon-frown-o';
    document.getElementById("beach").classList.add(icon);
}

init();