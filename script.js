var campoDeTexto = document.querySelector("#respostaCampoDeTexto");
let array = new Array();
const RESTO_DIVISAO = "/100";

keyBtn = (key) => {
  campoDeTexto.value += key;
};

function validarConta() {
  try {
    validarOperacoesEspeciais();
    calcular();
  } catch (err) {
    alert(err.message);
  }
}

function validarOperacoesEspeciais() {
  let aux = campoDeTexto.value;

  while (
    aux.indexOf("√") != -1 ||
    aux.indexOf("^") != -1 ||
    aux.indexOf("%") != -1
  ) {
    array = aux.split(/[*+-/\/]/);
    console.log(array);

    for (let index = 0; index < array.length; index++) {
      if (array[index].includes("%")) {
        conta = array[index].split("%");
        aux = aux.replace(array[index], conta[0] + RESTO_DIVISAO + conta[1]);
      }

      if (array[index].includes("^")) {
        conta = array[index].split("^");
        aux = aux.replace(
          '^',
          "**"
        );
      }

      if (array[index].includes("√")) {
        conta = array[index].split("√");

        if (conta.length > 2) {
          aux = aux.replace(
            array[index],
            "Math.sqrt(" + conta[0] + "," + conta[1] + ")"
          );

        } else {
          aux = aux.replace(
            array[index],
            "Math.sqrt(" + conta[1] + "," + "2" + ")"
          );
        }
      }
    }
  }

 
  var novaExpressaoHistorico = criarElemento('conta', aux)
  var resultado = criarElemento('resultado', eval(aux))

  document.getElementById('historicoDeRespostas').appendChild(novaExpressaoHistorico);

  document.getElementById('historicoDeRespostas').appendChild(resultado);

  campoDeTexto.value = aux;
}

function calcular() {
  if(!isEmpty()) {
    campoDeTexto.value = eval(campoDeTexto.value);
  } else {
    alert('O campo está vazio, escreva uma expressão primeiro.')
  }
}

function ativarHistorico() {
  let historico = document.querySelector("#historicoDeRespostas");
  if(historico.style.display == 'none') {
    historico.style.display = 'block';
  } else {
    historico.style.display = 'none';
  }
}

function criarElemento(nomeClasse, conteudo) { 
   var div = document.createElement("div"); 
   var texto = document.createTextNode(conteudo);
   div.className = nomeClasse;
   if(nomeClasse == 'conta') {
     div.setAttribute("onclick", "pegarValor()")
   }
   div.appendChild(texto);
   div.style.cursor = "pointer";
   return div;
}

function pegarValor() { 
  $('.conta').on('click', function(e) {
      e.preventDefault();
       campoDeTexto.value = $(this).text()
  });
 }

limpar = () => {
  campoDeTexto.value = '';
};

removeDoArrayPeloIndex = (index) => {
  array.splice(index, 1);
};

isEmpty = () => {
  return campoDeTexto.value == ''
}

campoDeTexto.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    validarConta();
  }
});
