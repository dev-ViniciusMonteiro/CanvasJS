var soldados = []//x e y de soldados randomicos
var soldadosNormais = []//x e y de soldados normais
var tiros = []//salva x e y de tiros
var armaX = 400//x da ponta da arma, onde o tiro sai
var lado = 0//lado em que o quadrado vai andar
var pontos = 0, pontosr = 0//contagem de pontos de normal e randomico
var pfinal = []// ponto final do soldado criado randomicamente


		function init()//primeira funcao executada
		{  
			setInterval(draw,100)
			var canvas = document.getElementById('canvas')
			window.addEventListener('keydown', onKeyDown, true)//captura o botao apertado
		}
	

      
		function onKeyDown(ev) 
		{
				var x, y;
				if(ev.key == 'd')//'d' para ir pra direita
				{
					if(armaX<750)
					{
						armaX=armaX+5
					}
				}
				if(ev.key == 'a')//'a' para ir na esquerda
				{
					if(armaX>50)
					{
						armaX=armaX-5
					}
				}
				//quando aperta espaco ele gera um tiro
				if (ev.key == "w") {  //'w' para tirar
					x = ev.layerX
					y = ev.layerY
					if (tiros.length < 3) 
					{
						tiros.push(gerarTiro(armaX, y))
					}
				}
		}


	function randomInt(min, max) //gera randomico inteiro
	{
		return min + Math.floor((max - min) * Math.random())
	}

	
	//cria o soldado
	function gerarSoldado(color) 
	{
		var x = randomInt(50, 700);
		return {x: x, y: 25, cor:color};
	} 
	
	//cria o tiro 
	function gerarTiro(dx) 
	{
		var x = randomInt(50, 700);
		return {x: dx, y: 450, cor:'black'};
	} 
	
	function draw() 
	{
      var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext("2d");
	  
			ctx.save();
			ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas  
			
			//desenha os pontos comeco e final
			ctx.beginPath();
			//escreve os pontos
			ctx.font='20px arial'
			ctx.fillText('Randomicos : '+ pontosr +'     Normais : ' + pontos, 20, 30);//escreve os pontos
			//mapa
			ctx.moveTo(50,50);
			ctx.lineTo(750,50);
			
			ctx.moveTo(50,450);
			ctx.lineTo(750,450);

			//arma
			ctx.moveTo(400,500);
			ctx.lineTo(armaX,450);

            ctx.stroke();
            
				//apaga o tiro apos chegar ao final da pagina
				for(i=0;i<tiros.length;i++)
				{
					if(tiros[i].y<50)
					{
                        tiros.shift()
                    }
                }
            
			//gera X soldados por vez e coloca no array
			if (soldadosNormais.length < 3) //normais
			{
				soldadosNormais.push(gerarSoldado('red'));
			}
			if (soldados.length < 3) //randomicos
			{
				pfinal.push(randomInt(50,750))
				soldados.push(gerarSoldado('blue'));
			}

	
			//desenha os soldados
			for (var i = 0; i<soldados.length; i++) 
			{
				//cria randomicamente o lado em que o soldado vai, se 'e direira ou esquerda
				lado = randomInt(1,500)
				if(soldados[i].x>750)
				{
					soldados[i].x = 50
				}
				if(soldados[i].x<50)
				{
					soldados[i].x = 750
				}
				if(soldados[i].y<400){//quando o soldado estiver chegando ele vai se direcionar para a posicao final
					if(lado>250)//caso o lado for maior que 250 e soldado vai para direita um numero de casa randomico entre 0 e 20
					{
						soldados[i].x = soldados[i].x + randomInt(0,20);
					}
					else//caso o numero menor que 250 vai para esquerda com um numero randomico de casa entre 0 e 20
					{
						soldados[i].x = soldados[i].x -randomInt(0,20);
					}
				}else{
					soldados[i].x = soldados[i].x + ((soldados[i].x-pfinal[i])/32)//direciona o soldado para o ponto final randomico
				}
				soldados[i].y = soldados[i].y + 3;//anda de cima para baixo de 3 em 3
				ctx.fillStyle = soldados[i].cor;
				ctx.fillRect(soldados[i].x,soldados[i].y, 25, 25);

				if (soldados[i].y > 450) //caso o soldado chegue no ponto final ele some e comeca outro soldado
				{
					pfinal.splice(i,1)
					soldados.splice(i, 1);
				}
			}

			for (var i = 0; i<soldadosNormais.length; i++) //cria soldados que andam reto
			{
				soldadosNormais[i].y = soldadosNormais[i].y + 3;
				//ponto final sera inicial + 400 se for para direita e -400 se for para esquerda, mudam de direcao conforme o jogo anda escolhendo o melhor ponto final
				if(i==1)//anda soldado na diagonal, caso um soldado acetado todos mudam de posicao
				{
					soldadosNormais[i].x = soldadosNormais[i].x - 1;
				}else
				{
					soldadosNormais[i].x = soldadosNormais[i].x + 1;
				}
				ctx.fillStyle = soldadosNormais[i].cor;
				ctx.fillRect(soldadosNormais[i].x,soldadosNormais[i].y, 25, 25);

				if (soldadosNormais[i].y > 450) 
				{
					soldadosNormais.splice(i, 1);
				}
			}

			//desenha os tiros
			for (var i = 0 ; i < tiros.length; i++) 
			{
				tiros[i].y = tiros[i].y -10;
				ctx.fillStyle = tiros[i].cor;
				ctx.fillRect(tiros[i].x,tiros[i].y, 5, 5);
			}

			//colisao tiro com soldado
			//se o tiro estiver na mesma posicao que o soldado ambos somem e conta um ponto
			for(i=0;i<soldados.length;i++)
			{
				for(x=0;x<tiros.length;x++)//percorre todos os tiros com todos os soldados
				{
					if((soldados[i].x-2 <= tiros[x].x)&&(soldados[i].x+25 >= tiros[x].x))
					{
						if(soldados[i].y+20>=tiros[x].y-20)
						{
							pontosr = pontosr + 1
							soldados.splice(i,1)
							tiros.splice(x,1)	
							pfinal.splice(i,1)
						}
					}
				}
			}
			for(i=0;i<soldadosNormais.length;i++)
			{
				for(x=0;x<tiros.length;x++)
				{
					if((soldadosNormais[i].x-2 <= tiros[x].x)&&(soldadosNormais[i].x+25 >= tiros[x].x))
					{
						if(soldadosNormais[i].y+20>=tiros[x].y-20)
						{
							pontos = pontos + 1
							soldadosNormais.splice(i,1)
							tiros.splice(x,1)	
						}
					}
				}
			}
			

			ctx.restore();
    }