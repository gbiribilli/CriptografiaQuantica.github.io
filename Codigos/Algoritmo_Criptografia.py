def conversor_binario(numero, lista):
    if numero <= 1:
        lista.append(numero)
        return numero
    
    lista.append(int(numero % 2))
    return conversor_binario(int(numero) // 2, lista)

def tudo(palavra):
    letras = list(palavra)
    numerosAscii = []

    for i in letras:
        numerosAscii.append(ord(i))

    texto = ""
    
    for numero in numerosAscii:
        listaAsci = []
        conversor_binario(numero, listaAsci)
        listaAsci.reverse()
        
        # Garante que tenha 8 bits
        binario_str = ''.join(str(bit) for bit in listaAsci)
        while len(binario_str) < 8:
            binario_str = '0' + binario_str
            
        texto += binario_str + " "

    return texto.strip()

print(tudo("ola"))




def converterParaTexto(numero):
    textoconvertido = ""
    letra = chr(numero)
    textoconvertido += letra
    return textoconvertido

def descriptografar(numero):
    listaNumero = list(str(numero))
    listaNumero.reverse()
    soma = 0
    for i in range (len(listaNumero)):
        soma+= (int(listaNumero[i])* (2**i))
    print(soma)
    converter = converterParaTexto(soma)
    return converter


def descriptografia(binario):
    textoFinal = ""
    listaBinarios = binario.split()
    for i in range(len(listaBinarios)):
        textoconvertido = descriptografar(listaBinarios[i])
        textoFinal += textoconvertido
        return textoFinal

inicio = input('Texto: ')
texto = inicio.split()
fim = ""
i=0
while i < len(texto):
    textoconvertido = descriptografia(texto[i])
    i+=1
    fim += textoconvertido
print(fim)
