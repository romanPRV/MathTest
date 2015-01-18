'use strict';

function drawChecking() {
    $('#operation').hide();
    if (!$('.check').length) {
        $('<div>', {
            'class': 'check',
            'id': 'example'
        }).appendTo('#main');
        $('<input>', {
            'type': 'text',
            'class': 'check',
            'id': 'input',
            'placeholder': 'Введите ответ'
        }).appendTo('#main');
        $('<input>', {
            'type': 'submit',
            'class': 'check',
            'id': 'submit',
            'value': 'Ответить'
        }).appendTo('#main');
        $('<div>', {
            'class': 'check',
            'id': 'result'
        }).appendTo('#main');
        drawExample();
    }

    var countCorrect = 0;
    var countWrong = 0;

    $('#submit').on('click', function() {
        validate();
    });

    function validate() {
        var input = $('#input').val();
        if (validValue(input))  testVal(input, $('#example').text());
        else    alert('Разрешается ввод только положительных натуральных чисел!');
    }

    function validValue(value) {
        value = parseFloat(value);
        if (value === '')   return 0;
        else if (value !== 0) {
                if (!(value / value))   return 0;
                else if (value < 1)    return 0;
                    else if (!((value ^ 0) === value))    return 0;
                        else   return 1;
        }    else  return 0;
    }

    function testVal(input, str) {
        var splitted = str.split(' ');
        var res = 0;
        if (splitted[1] === '+')    res = +splitted[0] + +splitted[2];
        if (splitted[1] === '−')    res = splitted[0] - splitted[2];
        if (splitted[1] === '×')    res = splitted[0] * splitted[2];
        if (splitted[1] === '÷')    res = splitted[0] / splitted[2];
        if (res === parseFloat(input))  countCorrect++;
        else    countWrong++;
        drawCounters();
        drawExample();
    }

    function drawCounters() {
        $('#result').text('Количество правильных ответов: ' + countCorrect +
                    '.\nКоличество ошибок: ' + countWrong);
    }
}

function drawExample() {
    $('#example').text(getExample(checkingFlags()));
}

function getExample(operations) {
    var result = [];
    var resultStr = '';
    for (var i = 0; i < operations.length; i++) {
        result[i] = {};
        result[i].flag = operations[i];
        result[i].func = window['getEx' + i];
    }
    var counter = result.reduce(function(prev, curr) {
        return prev + curr.flag;
    }, 0);
    var randomNum = Math.floor(Math.random() * counter) + 1;
    if (!counter)   return 'Не установлены типы примеров!';
    result.forEach(function(item) {
        if (item.flag)  randomNum--;
        if (!randomNum) {
            resultStr = item.func();
            randomNum--;
        }
    });
    return resultStr;
}

function drawSetting() {
    if ($('.check').length) {
        $('.check').remove();
    }
    if (!$('#operation').length) {
        $('<div>', {
            'id': 'operation'
        }).appendTo('#main');
        $('<input>', {
            'type': 'checkbox',
            'id': 'addition'
        }).appendTo('#operation');
        $('#addition').after('Сложение&nbsp;&nbsp;<br>');
        $('<input>', {
            'type': 'checkbox',
            'id': 'subtraction'
        }).appendTo('#operation');
        $('#subtraction').after('Вычитание&nbsp;<br>');
        $('<input>', {
            'type': 'checkbox',
            'id': 'multiplication'
        }).appendTo('#operation');
        $('#multiplication').after('Умножение<br>');
        $('<input>', {
            'type': 'checkbox',
            'id': 'division'
        }).appendTo('#operation');
        $('#division').after('Деление&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>');
    }
    $('#operation').show();
}

function checkingFlags() {
    var result = [0, 0, 0, 0];
    if ($('#addition:checked').length)  result[0] = 1;
    if ($('#subtraction:checked').length)  result[1] = 1;
    if ($('#multiplication:checked').length)  result[2] = 1;
    if ($('#division:checked').length)  result[3] = 1;
    return result;
}

function getEx0() {
    var add1 = Math.floor(Math.random() * 10) + 1;
    var add2 = Math.floor(Math.random() * 10) + 1;
    return add1 + ' + ' + add2;
}

function getEx1() {
    var add1 = Math.floor(Math.random() * 10) + 1;
    var add2 = Math.floor(Math.random() * 10) + 1;
    var res = add1 + add2;
    return res + ' − ' + add1;
}

function getEx2() {
    var mult1 = Math.floor(Math.random() * 10) + 1;
    var mult2 = Math.floor(Math.random() * 10) + 1;
    return mult1 + ' × ' + mult2;
}

function getEx3() {
    var mult1 = Math.floor(Math.random() * 10) + 1;
    var mult2 = Math.floor(Math.random() * 10) + 1;
    var res = mult1 * mult2;
    return res + ' ÷ ' + mult1;
}