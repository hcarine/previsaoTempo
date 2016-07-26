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
    createGraphic(dados.list);
    
}

function messageErro(message){
    alert("infelismente ocorreu um erro, verifique o nome da cidade e veja se corresponde ao estado");
}

function updateValuesToday(min, max){
  document.getElementById("todayMin").value = min;
  document.getElementById("todayMax").value = max;
}

function updateCityName(name){
   $('#cityName').html("Previsão para a cidade de: " + name);
}


function createGraphic(dados){
    var day = [];
    for(var i=0; i<dados.length; i++){
            day[i] = new Object();
        	day[i].date = new Date(dados[i].dt * 1000);
        	day[i].max =  dados[i].temp.max;
        	day[i].min = dados[i].temp.min;
        
	    }
    

    var chart = new CanvasJS.Chart("graphicTemperature", {
			title:{
				text: "Evolução da temperatura durante a semana",
				fontSize: 30
			},
            animationEnabled: true,
			axisX:{

				gridColor: "Silver",
				tickColor: "silver",
				valueFormatString: "DD/MMM"

			},                        
                        toolTip:{
                          shared:true
                        },
			theme: "theme2",
			axisY: {
				gridColor: "Silver",
				tickColor: "silver"
			},
			legend:{
				verticalAlign: "center",
				horizontalAlign: "right"
			},
			data: [
			{        
				type: "line",
				showInLegend: true,
				lineThickness: 2,
				name: "Min",
				markerType: "square",
				color: "#F08080",
				dataPoints: [
					{ x: new Date(day[0].date), y: day[0].min },
                    { x: new Date(day[1].date), y: day[1].min },
                    { x: new Date(day[2].date), y: day[2].min },
                    { x: new Date(day[3].date), y: day[3].min },
                    { x: new Date(day[4].date), y: day[4].min },
                    { x: new Date(day[5].date), y: day[5].min },
                    { x: new Date(day[6].date), y: day[6].min }
				]
			},
			{        
				type: "line",
				showInLegend: true,
				name: "Max",
				color: "#20B2AA",
				lineThickness: 2,

				dataPoints: [
					{ x: new Date(day[0].date), y: day[0].max },
                    { x: new Date(day[1].date), y: day[1].max },
                    { x: new Date(day[2].date), y: day[2].max },
                    { x: new Date(day[3].date), y: day[3].max },
                    { x: new Date(day[4].date), y: day[4].max },
                    { x: new Date(day[5].date), y: day[5].max },
                    { x: new Date(day[6].date), y: day[6].max }
				]
			}

			
			],
          legend:{
            cursor:"pointer",
            itemclick:function(e){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              	e.dataSeries.visible = false;
              }
              else{
                e.dataSeries.visible = true;
              }
            }
          }
		});

     chart.render();


    
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