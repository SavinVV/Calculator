import React, {Component} from 'react';

import Display from '../display';
import Workspace from '../workspace';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equationList: ['0'],
        }
        this.onClickBtn = this.onClickBtn.bind(this);
    }

    resultIsCalculated = false;

    work(symbol) {
        let newEquationList = this.state.equationList;
        let firstNumber = newEquationList[0];
        if (!isNaN(symbol) || symbol === '.') {
            if (firstNumber === 'Деление на ноль невозможно') {
                newEquationList = []
                this.resultIsCalculated = false;
            }
            this.reedNumberInState(symbol, newEquationList);
        } else {
            if (firstNumber === 'Деление на ноль невозможно' && symbol !== 'C') {
                return;
            }
            if (symbol === 'x') {
                symbol = '*'
            }
            if (symbol === 'C') {
                this.resetEquation();
                return ;
            }
            const indexLastSymbol = firstNumber.length - 1;
            if (firstNumber[indexLastSymbol] === '.') {
                firstNumber = this.togglePoint(firstNumber);
                newEquationList[0] = firstNumber;
            }
            if (symbol === '=') {
                if (newEquationList.length < 3) {
                    newEquationList = [firstNumber];
                } else {
                    const res = this.calculateResult();
                    newEquationList = [res];
                }
                this.resultIsCalculated = true;
            } else if (symbol === '%') {
                newEquationList = this.processPercentSign();
            } else if (symbol === '+/-') {
                newEquationList = this.processPlusMinusSign();
            } else if (newEquationList.length === 3) {
                const res = eval(newEquationList.join(''));
                newEquationList = [res, symbol];
            } else {
                newEquationList[1] = symbol;
                this.resultIsCalculated = false;
            }
            this.setState(() => {
                return {
                    equationList: newEquationList
                };
            });
        }
 
    }

    reedNumberInState(symbol, array) {
        if (array.length < 2) {
            this.addDigitInNumber(array, symbol, 0);
        } else {
            this.addDigitInNumber(array, symbol, 2);
        }
        this.setState(() => {
            return {
                equationList: array
            };
        });
    }

    addDigitInNumber(array, digit, index) {
        let number = array[index];
        if (typeof(number) !== 'undefined' && number.length === 9) {
            return;
        }
        if (digit === '.') {
            if (this.resultIsCalculated || typeof(number) === 'undefined') {
                number = '0.'
                this.resultIsCalculated = false;
            } else {
                number = this.togglePoint(number);
            }
        } else if (number === '0' || typeof(number) === 'undefined') {
            number = String(digit);
        } else if (this.resultIsCalculated) {
            number = String(digit);
            this.resultIsCalculated = false;
        } else {
            if (index === 0) {
                number = number + digit;
            } else {
                if (number[0] !== '(') {
                    number = number + digit;
                } else {
                    const numberModule = number.slice(2, number.length - 1);
                    number = `(-${numberModule}${digit})`;
                }
            }
        }
        array[index] = number;
    }

    calculateResult() {
        let {equationList} = this.state;
        const res = eval(equationList.join(''));
        const divisionByZero = (res === Infinity || res === -Infinity ||  isNaN(res));
        if (divisionByZero) {
            return 'Деление на ноль невозможно';
        }
        return res;
    }

    resetEquation () {
        this.resultIsCalculated = false;
        this.setState(() => {
            return {
                equationList: ['0']
            }
        });
    }

    processPercentSign() {
        let newEquationList = this.state.equationList;
        let percentOfTheNumber;
        if (newEquationList.length === 3) {
            percentOfTheNumber = newEquationList[0] * newEquationList[2] / 100;
            newEquationList[2] = percentOfTheNumber;
        } else if (newEquationList.length === 2) {
            percentOfTheNumber = newEquationList[0] * newEquationList[0] / 100;
            newEquationList[2] = percentOfTheNumber;
        } else {
            newEquationList = ['0'];
        }
        return newEquationList;
    }

    processPlusMinusSign() {
        let newEquationList = this.state.equationList;
        if (newEquationList.length < 2) {
            newEquationList[0] = this.togglePlusMinusSign(newEquationList[0]);
        } else if (newEquationList.length > 2) {
            newEquationList[2] = this.togglePlusMinusSign(newEquationList[2], 2);
        }
        return newEquationList;
    }

    togglePlusMinusSign(number, indexNumberInEquation) {
        number = String(number);
        if (indexNumberInEquation === 2) {
            if (number[0] === '(') {
                number = number.slice(2, number.length - 1);
            } else if (eval(number) !== 0) {
                number = `(-${number})`;
            }  
        } else {
            if (number[0] === '-') {
                number = number.slice(1)
            } else if  (number !== '0') {
                number = `-${number}`;
            }
        }
        return number;
    }

    togglePoint(number) {
        const indexPoint = number.indexOf('.');
        const indexLastSymbol = number.length - 1;
        if (indexPoint < 0) {
            if (number.indexOf(')') > 0) {
                number = `${number.slice(0, indexLastSymbol)}.)`;
            } else {
                number = number + '.';
            }
        } else if (indexPoint === indexLastSymbol) {
            number = number.slice(0, indexLastSymbol);
        } else if (indexPoint === indexLastSymbol - 1 && number[indexLastSymbol] === ')') {
            number = `${number.slice(0, indexLastSymbol - 1)})`;
        }
        return number;
    }

    onClickBtn(symbol) {
        this.work(symbol);
    }

    render() {
        
        const str = this.state.equationList.join('');
        return (
            <div className='app'>
                <Display
                    data={str}/>
                <Workspace
                    onClickBtn={this.onClickBtn}/>
            </div>
        )
    }
}
