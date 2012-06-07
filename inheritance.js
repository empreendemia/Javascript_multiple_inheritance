/*
* Copyright 2012 Rafael Almeida Erthal Hermano
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
* instanceOf
* @author: Rafael Almeida Erthal Hermano (rafaerthal@gmail.com)
* @since: 2012-06
* 
* @description: Retorna se o objeto é instância ou herdeiro de uma classe
* @param(parentclass) : nome do antepassado que passara pela checagem
*/
Object.prototype.instanceOf = function (parentclass) {
    "use strict";

    var proto = this.getProto(),
        parentPosition,
        res = false;

    /* Percorrer todas as classes antepassada */
    for (parentPosition in proto) {
        if (proto.hasOwnProperty(parentPosition)) {
            /* Caso seja encontrada a classe mudar para true */
            if (proto[parentPosition] === parentclass) {
                res = true;
            }
        }
    }

    return res;
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