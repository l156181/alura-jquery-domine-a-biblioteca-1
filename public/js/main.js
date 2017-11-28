var tempoRestante = $("#tempo-digitacao").text();
var tempoInicial = tempoRestante;
var campo = $(".campo-digitacao");
var botaoReiniciar = $("#botao-reiniciar")

// $(document).ready(function(){
//campo.css("background-color","lightgray");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    botaoReiniciar.click(reiniciaJogo);
});

function reiniciaJogo(){
    $("#botao-reiniciar").click(function(){
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial)
        inicializaCronometro();
    });    
}

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var arrayFrase = frase.split(" ");
    var numPalavras = arrayFrase.length;
    
    var elementTamanhoFrase = $("#tamanho-frase");
    elementTamanhoFrase.text(numPalavras);
}

function inicializaCronometro(){
    tempoRestante = tempoInicial;
    campo.one("focus",function(){
    var intervalID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
           
            if(tempoRestante < 1){
                campo.addClass("campo-desativado");
                campo.attr("disabled",true);
                clearInterval(intervalID);
                $("#botao-reiniciar").attr("disabled",false); 
            }   
        },1000);
    });

    $("#botao-reiniciar").attr("disabled",true);
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\s+/).length;
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length);
    });
}
