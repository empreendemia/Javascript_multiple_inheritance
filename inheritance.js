/**
* inherits
* @author: Rafael Almeida Erthal Hermano (rafaerthal@gmail.com)
* @since: 2012-06
* 
* @description: Método que implementa herança entre classes
* @params: Classes que serão herdadas
*/
Function.prototype.inherits = function () {
    "use strict";

    var proto = {},
        parentPosition,
        Parent,
        newmethod;

    /* Pegar vetor com todas as classes que serão herdadas */
    for (parentPosition in arguments) {
        if (arguments.hasOwnProperty(parentPosition)) {
            Parent = arguments[parentPosition];

            /* Salvar a classe em uma estrutura para utiliza-la futuramente */
            proto[Parent.name] = new Parent();

            /* Colocar os atributos na classe herdeira */
            for (newmethod in Parent.prototype) {
                if (Parent.prototype.hasOwnProperty(newmethod)) {
                    this.prototype[newmethod] = Parent.prototype[newmethod];
                }
            }
        }
    }

    /**
    * getProto
    * @author: Rafael Almeida Erthal Hermano (rafaerthal@gmail.com)
    * @since: 2012-06
    * 
    * @description: Retorna todas as classes que o objeto herdou
    */
    this.prototype.getProto = this.getProto = function () {
        var res = proto || {},
            current,
            recur,
            newProto;

        /* Pegar todas as classes que o objeto herdou diretamente */
        for (current in proto) {
            if (proto.hasOwnProperty(current)) {
                if (proto[current].getProto !== undefined) {
                    /* Pegar recursivamente todas as classes */
                    recur = proto[current].getProto();

                    /* Colocar as classes dos antepassados no resultado */
                    for (newProto in recur) {
                        if (recur.hasOwnProperty(newProto)) {
                            res[newProto] = recur[newProto];
                        }
                    }
                }
            }
        }

        return res;
    };

    return this;
};

/**
* ubber
* @author: Rafael Almeida Erthal Hermano (rafaerthal@gmail.com)
* @since: 2012-06
* 
* @description: Retorna a implementação de um método em uma classe antepassada
* @param(method) : nome do método que será chamado
* @param(parent) : nome do antepassado que irá fornecer o método(opcional)
* 
* @throws : Parent not found
* @throws : Method not found
* @throws : Method undefined
*/
Object.prototype.ubber = function (method, parent) {
    "use strict";

    var that = this,
        proto = this.getProto(),
        parentPosition,
        res;

    if (parent !== undefined) {
        /* Caso o antepassado seja setado pegue o método nele */
        if (method !== undefined) {
            if (proto[parent.name] !== undefined) {
                if (proto[parent.name][method] !== undefined) {
                    res = proto[parent.name][method];
                } else {
                    throw "Method not found";
                }
            } else {
                throw "Parent not found";
            }
        } else {
            throw "Method undefined";
        }
    } else {
        /* Procurar por antepassados que tenham o método requisitado */
        for (parentPosition in proto) {
            if (proto.hasOwnProperty(parentPosition)) {
                /* Caso seja encontrado o método guarda-lo */
                if (proto[parentPosition][method] !== undefined) {
                    res = proto[parentPosition][method];
                }
            }
        }
        if (res === undefined) {
            throw "Method not found";
        }
    }

    /* Se o método foi encontrado, retornar um closure para aplica-lo ao objeto corrente */
    return function () {
        return res.apply(that, arguments);
    };
};

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
                             
Portanto, o método temp entraria em conflito em Teste pois ele herda 3 métodos
temp distintos.

Como o método ubber especifica de quem estamos chamando o método,
este conflito é resolvido.
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