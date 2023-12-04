using Microsoft.AspNetCore.SignalR;
using SGOO3.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGOO3.Hubs
{
    public class SignalR : Hub
    {
        // Método responsável por enviar mensagem a todos os usuários conectados
        public async Task SendMessage(string user, string message, string myChannelId, string myChannelVal)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, myChannelId, myChannelVal).ConfigureAwait(false);
        }

        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message).ConfigureAwait(false);
        }

        public async Task ListenerSync(string time)
        {
            await Clients.All.SendAsync("ListenerSync", time).ConfigureAwait(false);

        }

        public async Task RefreshStatus(string statusName, int idJob)
        {
            await Clients.All.SendAsync("RefreshStatus", statusName, idJob).ConfigureAwait(false);
        }

        public async Task RefreshStatusLQS(string statusName, int idSequenceExecution)
        {
            await Clients.All.SendAsync("RefreshStatusLQS", statusName, idSequenceExecution).ConfigureAwait(false);
        }

    }
}
