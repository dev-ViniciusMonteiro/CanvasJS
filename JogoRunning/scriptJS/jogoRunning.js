var canvas = document.getElementById('jogoRunning');
var ctx = canvas.getContext('2d');
var setasB = new Image()
var setasC = new Image()


  
function init()// Essa funcao serve para é chamada na tag <body>(la em baixo) na qual ira imediatamente iniciar após o carregamento de uma página
    {
        window.addEventListener('keydown', onKeyDown, true)
        setasB.src = "./img/seta.png"
        setasC.src = "./img/setaCima.png"
        requestAnimationFrame(draw)//chama a animacao quando o sistema tiver pronto para printar o quadro
    }


   

    //cria o obj jogador =>
    const jogador = {
        lado: 1, 
        velo: 10,
        altura: 100,
        largura: 100,
        x: 250,
        y:0,
        colisaCima: 0,
        acelerary(){
        if(this.lado==2){
          if(this.y>((canvas.height-1.1)-jogador.altura)){
          this.y = this.y
          }
          else
          this.y += this.velo
        }
        if(this.lado==1){
          if(this.y<(1.1)){
          this.y = this.y
          }
          else
          this.y -= this.velo
        }
      },
      mudaLado(){
            if((this.lado==1)&&(this.y<(1.1)))
            this.lado=2
            if((this.lado==2)&&(this.y>((canvas.height-1.1)-jogador.altura)))
            this.lado=1
        }
}

const objetos = [

]


//caso clicado w ou s =>
function onKeyDown(ev) {
    if ((ev.key == "w")||(ev.key == "s")) {  //Seta para Baixo
       jogador.mudaLado()
       }
    }


//cria todas as imagens
  function criaImgJogador(){
      if(jogador.lado==1){
      ctx.drawImage(setasB, jogador.x, jogador.y,jogador.altura,jogador.largura);
       
      }else
      if(jogador.lado==2){
        ctx.drawImage(setasC, jogador.x, jogador.y,jogador.altura,jogador.largura)
      }else{
        ctx.font = '58px serif';
        ctx.color = "red"
        ctx.strokeText('Erro lado indefinido', 200, 200);
      }
  }



    function draw(){//funcao principal de um canvas
        
        

        ctx.save()// Ele mostra onde comeca o nosso ciclo salvando seu estado entre o save e o restore
        
        ctx.clearRect(0,0,canvas.clientWidth,canvas.height)//ele coloca um retangulo sobre o canvas com o tamanho e especificacoes do canvas 
        
        
       
        jogador.acelerary()
        criaImgJogador()
        //jogador.acelerarx()
        
        
       
        ctx.restore()// junto com a funcao save para de salvar o ciclo para um novo ciclo
        requestAnimationFrame(draw)//chama a animacao no save quando o sistema acabar o seu processamento anterior 

    }
