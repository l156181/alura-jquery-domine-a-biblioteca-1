function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas";
    var numPalavras =  $("#contador-palavras").text();
    var linha = novaLinha(usuario,numPalavras);

    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();    
}

function novaLinha(usuario,numPalavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover);
    
    return linha;
}

function removeLinha(){
    event.preventDefault();
    var tempoFadeOut = 1000;
    var linha = $(this).parent().parent();
    linha.stop().fadeOut(tempoFadeOut);
    
    setTimeout(() => {
        linha.remove();
    }, tempoFadeOut);
}

function mostraPlacar(){
    $(".placar").slideToggle();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top; 
    
    $("html,body").animate(
    {
        scrollTop: posicaoPlacar + 'px'
    },1000);
}

$("#botao-placar").click(mostraPlacar);

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");    

    linhas.each(()=>{
        var usuario  = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,pontos:palavras
        };
        
        placar.push(score);
    });
    var dados = {
        placar:placar
    }
    $.post("http://localhost:3000/placar",dados, () =>{
        console.log("salvou dados");
    });
}