Javascript_multiple_inheritance
===============================

#####Javascript multiple inheritance é um método de implementação de herança multipla em classes.

#####Para fazer uma classe herdar de outra, é simples. Primeiro, declaramos a classe a partir de seu construtor:

`function ClassName (...){
    ... constructor logic ...
}`

#####Após termos declarado a classe, declaramos a sua herança:

`ClassName.inherits (p1, p2, ..., pn);`

######Onde p1,p2,...,pn são as classes que serão herdadas.

#####Com a chamada deste método, todos os objetos desta classe que forem constuidos irão carregar os métodos das classes antepassadas.
#####O método ubber também é adicionado a todos os objetos. Este método chama a implementação original de determinado método caso ela tenha sido sobrescrito.

#####Para utilizarmos o ubber existem duas formas:
* Explicitando a classe antepassada que você quer chamar o método: `obj.ubber('methodName', p1)(arguments);`
  
* Omitindo classe antepassada que você quer chamar o método: `obj.ubber('methodName')(arguments);`
  
######Note que ao explicitar de qual classe você chama o método, você evita problemas de conflito de nomes, um problema recorrente na herança multipla.