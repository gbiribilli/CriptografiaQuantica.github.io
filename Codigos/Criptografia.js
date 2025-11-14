// Criptografia.js — versão com "Interceptar"

let interceptado = false; // flag global

function conversor_binario(numero, lista) {
    if (numero <= 1) {
        lista.push(numero);
        return numero;
    }

    lista.push(Math.floor(numero % 2));
    return conversor_binario(Math.floor(numero / 2), lista);
}

// Gera um valor aleatório inteiro entre min (inclusive) e max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function criptografar(palavra) {
    const letras = palavra.split('');
    const numerosAscii = [];

    for (let i = 0; i < letras.length; i++) {
        numerosAscii.push(letras[i].charCodeAt(0));
    }

    // Se interceptado, embaralha os códigos ASCII (gera novos códigos aleatórios).
    // Aqui usamos uma transformação simples: soma um deslocamento aleatório e faz wrap 0-255.
    let numerosAsciiParaConverter = numerosAscii.slice(); // copia original
    if (interceptado) {
        numerosAsciiParaConverter = numerosAsciiParaConverter.map(originalCode => {
            const desloc = randInt(1, 200); // deslocamento aleatório (1..200)
            return (originalCode + desloc) % 256; // wrap para 0-255
        });
    }

    let texto = "";
    const listaAsci = [];

    for (let n = 0; n < numerosAsciiParaConverter.length; n++) {
        conversor_binario(numerosAsciiParaConverter[n], listaAsci);
        listaAsci.reverse();
        texto += "0";

        // remove o valor 0.5 se existir (mantido por fidelidade)
        const index = listaAsci.indexOf(0.5);
        if (index !== -1) {
            listaAsci.splice(index, 1);
        }

        for (let i = 0; i < listaAsci.length; i++) {
            texto += listaAsci[i].toString();
        }

        listaAsci.length = 0; // limpa a lista
        texto += " ";
    }

    // Após criptografar, resetamos o flag para evitar que próximas criptografias sejam
    // embaralhadas sem intenção — remova esta linha se preferir que o efeito persista.
    // interceptado = false;

    return texto.trim();
}

function converterParaTexto(numero) {
    let textoconvertido = "";
    let letra = String.fromCharCode(numero);
    textoconvertido += letra;
    return textoconvertido;
}

function descriptografar(numero) {
    let listaNumero = String(numero).split("");
    listaNumero.reverse();
    let soma = 0;

    for (let i = 0; i < listaNumero.length; i++) {
        soma += parseInt(listaNumero[i]) * (2 ** i);
    }

    // console.log(soma);
    let converter = converterParaTexto(soma);
    return converter;
}

function descriptografia(binario) {
    let textoFinal = "";
    let listaBinarios = binario.trim().split(/\s+/);
    for (let i = 0; i < listaBinarios.length; i++) {
        if (listaBinarios[i].length === 0) continue;
        let textoconvertido = descriptografar(listaBinarios[i]);
        textoFinal += textoconvertido;
    }
    return textoFinal;
}

// --- Função para interceptar (ligada ao botão "Interceptar" no HTML)
function interceptarMensagem() {
    interceptado = true;
    alert("Mensagem interceptada! A mensagem foi alterada.");
    // opção: alterar visual do botão ou informar área da página que ocorreu interceptação
}

