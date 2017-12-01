$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-frase-sync").click(sincronizaPlacar);

function fraseAleatoria(){
    $("#spinner").show();

    $.get("http://localhost:3000/frases",(data) =>{
        var frase = $("frase");
        var numeroAleatorio = Math.floor(Math.random() * data.length);
        frase.text(data[numeroAleatorio].texto);
        atualizaTamanhoFrase();
        atualizaTempo(data[numeroAleatorio].tempo);
    })
    .fail(()=>{        
        $("#erro").show();

        setTimeout(() =>{
            $("#erro").hide();                    
        },1500);
    })
    .always(()=>{
        $("#spinner").toggle();
    });
}

function buscaFrase(){
    var fraseID = $("frase-id").val();
    var dados = {id : frasId};
    $.get("http://localhost:3000/frases",dados,(data)=>{
        var frase = $("frase");
        var numeroAleatorio = Math.floor(Math.random() * data.length);
        frase.text(dados.texto);
        atualizaTamanhoFrase();
        atualizaTempo(dados.tempo);
    })
    .fail(()=>{        
        $("#erro").show();

        setTimeout(() =>{
            $("#erro").hide();                    
        },1500);
    })
    .always(()=>{
        $("#spinner").toggle();
    });
}