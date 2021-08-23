function meuEscopo(){
    const seletorContainer = document.querySelector('.container');
    const seletorRelogio = document.querySelector('.relogio');
    const seletorContador = document.querySelector('.contadorQuadrado');
   
    let segundos = 0;
    let timer;
    let contador = 0;
    let contadorQuadrado;
    let seletorNodeList = 0;
    let seletorContadorAll;
    let seletorContadorI;

    function criaHoraDosSegundos(segundos){
        const data = new Date(segundos * 1000);
        return data.toLocaleString('pt-BR',{
            hour12: false,
            timeZone: 'UTC',
            timeStyle: 'medium'
        });
    }    

    function iniciaRelogio(){
        timer = setInterval(function(){
            segundos++;
           seletorRelogio.innerHTML = criaHoraDosSegundos(segundos);
        }, 1000);
    }

    function limpaQuadrados(){
        seletorContadorAll = document.querySelectorAll('.contadorQuadrado');
        for(let i = 1; i < seletorContadorAll.length; i++){
            seletorContainer.removeChild(seletorContadorAll[i]);
        }      
    }

    function setarCorVerde(){
        seletorContadorAll = document.querySelectorAll('.contadorQuadrado');
        for(let i = 0; i < seletorContadorAll.length; i++){
            seletorContadorI = seletorContadorAll[i];
            seletorContadorI.style.backgroundColor = '#00FF00';
        }    
    }

    function setarCorVermelha(){
        seletorContadorAll = document.querySelectorAll('.contadorQuadrado');
        for(let i = 0; i < seletorContadorAll.length; i++){
            seletorContadorI = seletorContadorAll[i];
            seletorContadorI.style.backgroundColor = '#FF0000';
        }     
    }

    function removerCores(){
        seletorRelogio.classList.remove('verde');
        seletorRelogio.classList.remove('vermelho');
    }
    
    function iniciaContador(){
        contadorQuadrado = setInterval(function(){
            contador += 28;
            seletorNodeList += 1;

            const divQuadrado = document.createElement('div');
            seletorContainer.appendChild(divQuadrado);
            divQuadrado.classList.add('contadorQuadrado');
            seletorContadorAll = document.querySelectorAll('.contadorQuadrado');
            seletorContadorI = seletorContadorAll[seletorNodeList];
                
            if(contador <= 420){
                seletorContadorI.style.top = '0px';
                seletorContadorI.style.left = `${contador}px`;
            }
            if(contador > 420 && contador <= 840){
                seletorContadorI.style.left = '420px';
                seletorContadorI.style.top = `${contador - 420}px`;
            }
            
            
            if(contador > 840 && contador <= 1260){
                seletorContadorI.style.left = 'none';
                seletorContadorI.style.top = '420px';
                seletorContadorI.style.right = `${contador - 840}px`;
            }
            if(contador > 1260 && contador <= 1652){
                seletorContadorI.style.right = '420px';
                seletorContadorI.style.bottom = `${contador - 1260}px`;
            }

           if(contador > 1652){
               contador = 0;
               seletorNodeList = 0;
               limpaQuadrados();
           }
        }, 1000);
    }

    document.addEventListener('click', function(evento){
        const elemento = evento.target;

        if(elemento.classList.contains('iniciar')){
            clearInterval(timer);
            clearInterval(contadorQuadrado);
            seletorContainer.style.border = `10px solid #00FF00`
            seletorContador.style.display = 'block';
            seletorRelogio.classList.add('verde');
            removerCores();
            iniciaRelogio();
            iniciaContador();
            setarCorVerde();  
        }

        if(elemento.classList.contains('pausar')){
            clearInterval(timer);
            clearInterval(contadorQuadrado);
            seletorContainer.style.border = '10px solid #FF0000'
            seletorRelogio.classList.add('vermelho');
            removerCores(); 
            setarCorVermelha();       
        }

        if(elemento.classList.contains('zerar')){
            clearInterval(timer);
            clearInterval(contadorQuadrado);
            limpaQuadrados();
            removerCores();
            seletorRelogio.innerHTML = '00:00:00'
            seletorContainer.style.border = 'none';
            seletorContador.style.display = 'none';
            segundos = 0;
            contador = 0;
            seletorNodeList = 0;
        }
    });
}

meuEscopo();



