/*
 * O objetivo de "use strict"é indicar que o código deve ser executado em "modo estrito".
 * Com o modo estrito, você não pode, por exemplo, usar variáveis ​​não declaradas.
*/

"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/signalR")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(start);

start();// Start the connection.

connection.on("ReceiveMessage", function (user, message) {
    var pollResultMsg = user + " " + message;

    // Lista desordenada <ul>
    var ulPoll = document.getElementById("messagesList");

    // Item da lista <li>
    var liPollResult = document.createElement("li");
    liPollResult.textContent = pollResultMsg;

    // Insere na lista
    ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);

    // Altera a quantiade de notificações
    var qtdN = Number($("#spanQtdNotification").html()) + 1;
    $("#spanQtdNotification").html(qtdN);
});

function NewOrderNotification() {
    var message = "criou uma nova ordem.";
    if (user == '') {
        user = "[Anônimo]";
    }
    connection.invoke("SendMessageToAll", user, message).catch(function (err) {
        return console.error(err.toString());
    });
}

function NewStepNotification() {
    var message = "criou um novo step.";
    if (user == '') {
        user = "[Anônimo]";
    }
    connection.invoke("SendMessageToAll", user, message).catch(function (err) {
        return console.error(err.toString());
    });
}




//////////////////////

connection.on("ListenerSync", function (time) {
   //let date = new Date(time);
   //document.getElementById("listenerTime").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    $('#listenerTime').text(time)
});

