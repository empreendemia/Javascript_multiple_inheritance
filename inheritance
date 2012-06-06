Function.prototype.inherits = function () {
    "use strict";

    var proto = {},
        parentPosition,
        Parent,
        newmethod;

    for (parentPosition in arguments) {
        if (arguments.hasOwnProperty(parentPosition)) {
            Parent = arguments[parentPosition];

            proto[Parent.name] = new Parent();
            for (newmethod in Parent.prototype) {
                if (Parent.prototype.hasOwnProperty(newmethod)) {
                    this.prototype[newmethod] = Parent.prototype[newmethod];
                }
            }
        }
    }

    this.prototype.getProto = this.getProto = function () {
        var res = proto || {},
            current,
            recur,
            newProto;

        for (current in proto) {
            if (proto.hasOwnProperty(current)) {
                if (proto[current].getProto !== undefined) {
                    recur = proto[current].getProto();

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

    this.prototype.ubber = function (method, parent) {
        var that = this,
            proto = this.getProto(),
            parentPosition,
            res;

        if (parent !== undefined) {
            if (method !== undefined) {
                if (proto[parent.name] !== undefined && proto[parent.name][method] !== undefined) {
                    res = proto[parent.name][method];
                }
            }
        } else {
            for (parentPosition in proto) {
                if (proto.hasOwnProperty(parentPosition)) {
                    if (proto[parentPosition][method] !== undefined) {
                        res = proto[parentPosition][method];
                    }
                }
            }
        }

        if (res !== undefined) {
            return function () {
                return res.apply(that, arguments);
            };
        }
    };

    return this;
};








function classeA(){};
classeA.prototype.temp = function(){
    console.log(this.lala + ' Este metodo veio da classe A');
};


function classeB(){};
classeB.prototype.temp = function(){
    console.log(this.lala + ' Este metodo veio da classe B');
};
classeB.prototype.temp1 = function(){
    console.log(this.lala + ' testando hierarquia');
};


function classeC(){};
classeC.inherits(classeB);
classeC.prototype.temp = function(ab){
    console.log(ab);
    console.log(this.lala + ' Este metodo veio da classe C');
};



function Teste(){};
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

console.log('\n\n');


/*--------------------------------------------------------------------------*/


function interfaceA(){};
interfaceA.prototype.temp = function(){
    console.log('Chamando metodo de interface a partir da interface A');
    this.metododainterface();
};

function interfaceB(){};
interfaceB.prototype.temp = function(){
    console.log('Chamando metodo de interface a partir da interface B');
    this.metododainterface();
};

function implementadorInterfaces(){};
implementadorInterfaces.inherits(interfaceA, interfaceB);
implementadorInterfaces.prototype.metododainterface = function(){
    console.log("Aqui implemento a logica do metodo")
};


var teste = new implementadorInterfaces();

console.log('Testando interface de metodos');

console.log('\nMetodo que ficou estancado na classe:');
teste.temp();

console.log('\nChamada do metodo no pai sem dizer qual pai:');
teste.ubber('temp')();

console.log('\nChamada do metodo no pai especificando o pai(A):');
teste.ubber('temp', interfaceA)();

console.log('\nChamada do metodo no pai especificando o pai(B):');
teste.ubber('temp', interfaceB)();
