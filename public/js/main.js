var tempoRestante = $("#tempo-digitacao").text();
var tempoInicial = tempoRestante;
var campo = $(".campo-digitacao");
var botaoReiniciar = $("#botao-reiniciar");
var frase = $(".frase").text();
var intervalID;

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    botaoReiniciar.click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);
});

function reiniciaJogo(){
    campo.off("click");
    $("#botao-reiniciar").click(function(){
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial)
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("campo-correto campo-errado");
    });    
}

function atualizaTamanhoFrase(){    
    var arrayFrase = frase.split(" ");
    var numPalavras = arrayFrase.length;

    var elementTamanhoFrase = $("#tamanho-frase");
    elementTamanhoFrase.text(numPalavras);
}

function inicializaCronometro(){
    tempoRestante = tempoInicial;    
    botaoReiniciar.attr("disabled",true);
    
    clearInterval(intervalID);
    campo.off("focus");
    
    campo.one("focus",function(){   
        intervalID = setInterval(function(){
             tempoRestante--;
             $("#tempo-digitacao").text(tempoRestante);
            
             if(tempoRestante < 1){
                 clearInterval(intervalID);
                 finalizaJogo();
             }   
         },1000);
     });
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\s+/).length;
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length);

        var comparavel = frase.substr(0,conteudo.length);
        
        if(comparavel == conteudo){
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        }else{
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
    });
}

function finalizaJogo(){
    campo.addClass("campo-desativado");
    campo.attr("disabled",true);
    botaoReiniciar.attr("disabled",false); 
    inserePlacar();
}


// $(document).ready(function(){
// campo.css("background-color","lightgray");
// campo.addClass("campo-desativado");
// frase.startsWith(digitado)
// append or prepend
// .hide() or .show() or toggle or slideDown or slideUp or  slideToggle