function getClima(){
    // var city = document.getElementById("city").value.toLowerCase().trim();
    // var state = $("#state").val().toLowerCase();
    var city = "blumenau";
    var state = "santacatarina"

    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +',' + state +',br&mode=json&units=metric&cnt=7&appid=fece2aa20ad50047740813901a13081a',
        dataType: 'json',
        success: updatePrevision,
        error: messageErro
    });
}

function updatePrevision(dados) {
    var todayMin = dados.list[0].temp.min;
    var todayMax = dados.list[0].temp.max;
    
    createGraphic(dados);
}

function messageErro(mensage){
    console.log("infelismente ocorreu um erro, verifique o nome da cidade e veja se corresponde ao estado");
}

function createGraphic(dados){
    
}