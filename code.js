$('#getClime').on('submit', function(e) {
    e.preventDefault();
    getClima();
});

function getClima(){
    // var city = document.getElementById("city").value.toLowerCase().trim();
    // var state = $("#state").val().toLowerCase();
    var city = "blumenau";
    var state = "santacatarina";

    $.ajax({
        type: "GET",
        url:'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +',' + state +',br&mode=json&units=metric&cnt=7&appid=fece2aa20ad50047740813901a13081a',
        dataType: 'json',
        success: updatePrevision,
        error: messageErro
    });
}

function updatePrevision(dados) {
    document.getElementById("todayMin").value = dados.list[0].temp.min;
    document.getElementById("todayMax").value = dados.list[0].temp.max;

    //var showImage = isHotWeekend(dados.list);
    //createGraphic(dados);
    
}

function messageErro(message){
    console.log("infelismente ocorreu um erro, verifique o nome da cidade e veja se corresponde ao estado");
}

function createGraphic(dados){
    
}

function isHotWeekend(days){
    var weekend = [];
    for(var i; i< days.length; i++){
        var day = days[i].getDay();
       if((day == 6) || (day == 0)){
           weekend[weekend.length]= day[i].temp.min;
       }
    }
    if(isDayhot(weekend[0])  && isDayhot(weekend[0]) ){
      return true;  
    }
}

function isDayhot(day) {
    return day > 25 ? true : false;
}