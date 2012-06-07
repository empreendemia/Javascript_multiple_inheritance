/*----------------------------------------------------------------------------*/
/* Alguns exemplos */
/*
Nesse exemplo, vamos criar 4 classes A, B, C, Teste
o diagrama seria:
                 __________          _________
                 |ClasseA |          |ClasseB|
                 |--------|          |-------|
                 |+temp   |          |+temp  |
                 |________|          |+temp1 |
                    |                |_______|
                    |                   |
                    |                ___|_____
                    |                |ClasseC|
                    |                |-------|
                    |                |+temp  |
                    |                |_______|
                    |                   |
                    |___________________|
                               |
                             Teste
                             
Portanto, o m?todo temp entraria em conflito em Teste pois ele herda 3 m?todos
temp distintos.

Como o m?todo ubber especifica de quem estamos chamando o m?todo,
este conflito ? resolvido.
*/

(function () {
    "use strict";

    function classeA() {}
    classeA.prototype.temp = function () {
        console.log(this.lala + ' Este metodo veio da classe A');
    };

    function classeB() {}
    classeB.prototype.temp = function () {
        console.log(this.lala + ' Este metodo veio da classe B');
    };
    classeB.prototype.temp1 = function () {
        console.log(this.lala + ' testando hierarquia');
    };

    function classeC() {}
    classeC.inherits(classeB);
    classeC.prototype.temp = function (ab) {
        console.log(ab);
        console.log(this.lala + ' Este metodo veio da classe C');
    };

    function Teste() {}
    Teste.inherits(classeA, classeC);
    console.log(Teste.getProto());

    var teste = new Teste();
    teste.lala = "oioi";
    teste.temp1();

    console.log('Testando heranca de metodos');

    console.log('\nMetodo que ficou estancado na classe:');
    teste.temp();

    console.log('\nChamada do metodo no pai sem dizer qual pai:');
    teste.ubber('temp')();

    console.log('\nChamada do metodo no pai especificando o pai(A):');
    teste.ubber('temp', classeA)();

    console.log('\nChamada do metodo no pai especificando o pai(B):');
    teste.ubber('temp', classeB)();

    console.log('\nChamada do metodo no pai especificando o pai(C):');
    teste.ubber('temp', classeC)('eu tenho paramatro bunitinho');
}());
