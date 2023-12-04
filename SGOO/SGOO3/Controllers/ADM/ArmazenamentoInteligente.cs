using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Nest;
using SGOO3.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Net.Sockets;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using InTheHand.Net.Sockets;
using InTheHand.Net;
using InTheHand.Net.Bluetooth;
using System.IO;
using SGOO3.Models.Entities;
using Newtonsoft.Json;

namespace SGOO3.Controllers.ADM
{
    public class ArmazenamentoInteligente : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ArmazenamentoInteligente(ApplicationDbContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Configuracao()
        {
            try
            {
                var configuration = _context.Configuracao.FirstOrDefault();
                if (configuration != null)
                {
                    ViewBag.Audio = configuration.Audio;
                    ViewBag.Led = configuration.Led;
                }
                else
                {
                    ViewBag.Audio = 1;
                    ViewBag.Led = 1;
                }
            }
            catch (Exception ex)
            {
                ViewBag.Audio = 1;
                ViewBag.Led = 1;
            }

            return View();
        }

        public async Task<IActionResult> Cadastro()
        {
            Balanca model = new Balanca();
            model.Balancas = await _context.Balanca.ToListAsync();
            return View(model);
        }
        public async Task<IActionResult> Home()
        {
            Produto model = new Produto();
            model.Produtos = await _context.Produto.ToListAsync();
            return View(model);
        }
        public async Task<IActionResult> HomeDisconnected()
        {
            Produto model = new Produto();
            model.Produtos = await _context.Produto.ToListAsync();
            return View(model);
        }
        [HttpGet]
        public IActionResult CheckAudioConfig()
        {
            try
            {
                var configuration = _context.Configuracao.FirstOrDefault();
                bool audioEnabled = configuration?.Audio == true;

                return Json(new { audioEnabled });
            }
            catch (Exception ex)
            {
                // Lide com a exceção se necessário
                return Json(new { audioEnabled = false });
            }
        }

        [HttpPost]
        public async Task<ActionResult> RegisterProduct(int balancaId, string nomeProduto, decimal quantidadeMinima)
        {
            try
            {
                // Verifica se já existe um produto cadastrado com a mesma balança
                var existingProduct = await _context.Produto
                    .FirstOrDefaultAsync(p => p.BalancaId == balancaId);

                if (existingProduct != null)
                {
                    // Já existe um produto cadastrado para esta balança
                    return Json(new { success = false, message = "Já existe um produto cadastrado para esta balança.", existingProductName = existingProduct.Nome });

                }

                // Se não existe, continua com o cadastro
                var produto = new Produto();
                produto.createdBy = "ADMIN";
                produto.createdDate = DateTime.Now;
                produto.BalancaId = balancaId;
                produto.Nome = nomeProduto;
                produto.QuantidadeMinima = (int)quantidadeMinima;

                _context.Produto.Add(produto);
                await _context.SaveChangesAsync();

                return Json(new { success = true, message = "Produto cadastrado com sucesso!" });
            }
            catch (Exception ex)
            {
                // Em caso de erro, retorne um JSON indicando falha e inclua a mensagem de erro
                return Json(new { success = false, message = "Erro ao cadastrar o produto. Detalhes: " + ex.Message });
            }
        }
        [HttpPost]
        public async Task<ActionResult> UpdateProduct(int balancaId, string nomeProduto, decimal quantidadeMinima)
        {
            try
            {
                // Find the existing product with the same balancaId
                var existingProduct = await _context.Produto
                    .FirstOrDefaultAsync(p => p.BalancaId == balancaId);

                if (existingProduct != null)
                {
                    // Update the existing product
                    existingProduct.Nome = nomeProduto;
                    existingProduct.QuantidadeMinima = (int)quantidadeMinima;
                    existingProduct.modifiedBy = "ADMIN";
                    existingProduct.modifiedDate = DateTime.Now;

                    await _context.SaveChangesAsync();

                    return Json(new { success = true, message = "Dados da balança atualizados com sucesso!" });
                }

                // If no existing product is found, return an error
                return Json(new { success = false, message = "Produto não encontrado para atualização." });
            }
            catch (Exception ex)
            {
                // Handle the exception and return an error
                return Json(new { success = false, message = "Erro ao atualizar o produto. Detalhes: " + ex.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult> ClearBalanceData(int balanceId)
        {
            try
            {
                // Encontrar o produto associado à balança
                var existingProduct = await _context.Produto
                    .FirstOrDefaultAsync(p => p.BalancaId == balanceId);

                if (existingProduct == null)
                {
                    // Não existe um produto cadastrado para esta balança
                    return Json(new { success = false, message = "Não existe um produto cadastrado para esta balança." });
                }

                // Se existe, continua com a exclusão
                _context.Produto.Remove(existingProduct);
                await _context.SaveChangesAsync();

                return Json(new { success = true, message = "Dados da balança limpos com sucesso!" });
            }
            catch (Exception ex)
            {
                // Em caso de erro, retorne um JSON indicando falha e inclua a mensagem de erro
                return Json(new { success = false, message = "Erro ao limpar os dados da balança. Detalhes: " + ex.Message });
            }
        }



        [HttpPost]
        public JsonResult UpdateCheckboxStatus(string checkboxId, bool isChecked)
        {
            try
            {
                // Assuming checkboxId is either "led" or "audio"
                switch (checkboxId)
                {
                    case "led":
                        UpdateLedStatus(isChecked);
                        break;
                    case "leituraAutomatica":
                        UpdateAudioStatus(isChecked);
                        break;
                    // Add more cases for additional checkboxes if needed
                    default:
                        return Json(new { success = false, message = "Invalid checkboxId" });
                }

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        private void UpdateLedStatus(bool isChecked)
        {
            // Retrieve the existing configuration
            var configuration = _context.Configuracao.FirstOrDefault();
            if (configuration != null)
            {
                // Update the Led property based on the checkbox status
                configuration.Led = isChecked ? true : false;

                // Update the modified date (assuming you have a ModifiedDate property)
                configuration.modifiedDate = DateTime.Now;

                // Save changes to the database
                _context.Configuracao.Update(configuration);
                _context.SaveChanges();
            }
        }

        private void UpdateAudioStatus(bool isChecked)
        {
            // Retrieve the existing configuration
            var configuration = _context.Configuracao.FirstOrDefault();
            if (configuration != null)
            {
                // Update the Audio property based on the checkbox status
                configuration.Audio = isChecked ? true : false;

                // Update the modified date (assuming you have a ModifiedDate property)
                configuration.modifiedDate = DateTime.Now;

                // Save changes to the database
                _context.SaveChanges();
            }
        }
        [HttpGet]
        public JsonResult GetCurrentConfiguration()
        {
            try
            {
                var configuration = _context.Configuracao.FirstOrDefault();
                if (configuration != null)
                {
                    return Json(new
                    {
                        leituraAutomatica = configuration.Audio,
                        led = configuration.Led
                        // Add more properties for additional checkboxes if needed
                    });
                }
                else
                {
                    return Json(new { success = false, message = "Configuration not found" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        public IActionResult DiscoverBluetoothDevicess()
        {
            List<BluetoothDeviceInfo> bluetoothDevices = DiscoverBluetoothDevices();
            var result = new
            {
                Text = "Pareando Dispositivos",
                Devices = bluetoothDevices
            };

            return Json(result);
        }


        private bool isApplicationRunning = true;

        private List<BluetoothDeviceInfo> DiscoverBluetoothDevices()
        {
            List<BluetoothDeviceInfo> devices = new List<BluetoothDeviceInfo>();

            try
            {
                BluetoothClient bluetoothClient = new BluetoothClient();
                BluetoothDeviceInfo[] bluetoothDeviceInfoArray = bluetoothClient.DiscoverDevices();

                foreach (BluetoothDeviceInfo deviceInfo in bluetoothDeviceInfoArray)
                {
                    devices.Add(deviceInfo);
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during Bluetooth discovery.
                // You may want to log the error or handle it differently.
            }

            return devices;
        }

        //public async Task<IActionResult> SendDataToArduino(string deviceId)
        //{
        //    try
        //    {
        //        BluetoothClient bluetoothClient = new BluetoothClient();
        //        BluetoothDeviceInfo[] devices = bluetoothClient.DiscoverDevices();

        //        BluetoothDeviceInfo selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == deviceId);
        //        if (selectedDevice != null)
        //        {
        //            bool paired = BluetoothSecurity.PairRequest(selectedDevice.DeviceAddress, "1234"); // Substitua "1234" pela chave de pareamento desejada
        //            BluetoothClient connectedClient = new BluetoothClient();
        //            connectedClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
        //            NetworkStream stream = connectedClient.GetStream();


        //            string dataToSend = "0";
        //            var ledActive = await _context.Configuracao.Select(a => a.Led).FirstOrDefaultAsync();

        //            if (ledActive)
        //            {
        //                dataToSend = "1";
        //            }

        //            byte[] data = Encoding.UTF8.GetBytes(dataToSend);
        //            await stream.WriteAsync(data, 0, data.Length);
        //            Console.WriteLine("Data Sent: " + dataToSend);

        //        }
        //        // Adicione um retorno de sucesso no final do método
        //        return Json(new { success = true });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle the error as per your application's needs

        //        // Return success: false in case of connection failure
        //        return Json(new { success = false, errorMessage = ex.Message });
        //    }
        //}
        [HttpGet]
        public async Task<IActionResult> SendDataToArduino(string deviceId)
        {
            try
            {
                if (_bluetoothClient == null)
                {
                    _bluetoothClient = new BluetoothClient();
                }

                if (_connectedClient == null || !_connectedClient.Connected)
                {
                    BluetoothDeviceInfo[] devices = _bluetoothClient.DiscoverDevices();

                    BluetoothDeviceInfo selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == deviceId);
                    if (selectedDevice != null)
                    {
                        _connectedClient = new BluetoothClient();
                        _connectedClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
                    }
                }

                if (_connectedClient != null && _connectedClient.Connected)
                {
                    NetworkStream stream = _connectedClient.GetStream();
                    stream.ReadTimeout = 5000; // Ajuste conforme necessário

                    try
                    {
                        string dataToSend = "0";
                        var ledActive = await _context.Configuracao.Select(a => a.Led).FirstOrDefaultAsync();

                        if (ledActive)
                        {
                            dataToSend = "1";
                        }

                        byte[] data = Encoding.UTF8.GetBytes(dataToSend);
                        await stream.WriteAsync(data, 0, data.Length);
                        Console.WriteLine("Data Sent: " + dataToSend);

                        // Adicione um retorno de sucesso no final do método
                        return Json(new { success = true });
                    }
                    finally
                    {
                        if (_connectedClient.Connected)
                        {
                            _connectedClient.Close();
                        }
                    }
                }

                // Adicione um retorno de sucesso no final do método
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                // Handle the error as per your application's needs

                // Return success: false in case of connection failure
                return Json(new { success = false, errorMessage = ex.Message });
            }
        }


        //public async Task<IActionResult> ReceivedArduinoData(string deviceId)
        //{
        //    try
        //    {
        //        BluetoothClient bluetoothClient = new BluetoothClient();
        //        BluetoothDeviceInfo[] devices = bluetoothClient.DiscoverDevices();

        //        BluetoothDeviceInfo selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == deviceId);
        //        if (selectedDevice != null)
        //        {
        //            BluetoothClient connectedClient = new BluetoothClient();
        //            connectedClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
        //            NetworkStream stream = connectedClient.GetStream();

        //            byte[] buffer = new byte[1024];
        //            int bytesRead = stream.Read(buffer, 0, buffer.Length);
        //            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

        //            Console.WriteLine("Dados Recebidos: " + receivedData);

        //            var produtos = await _context.Produto.ToListAsync();
        //            var balancas = await _context.Balanca.ToListAsync();

        //            double[] weightData = JsonConvert.DeserializeObject<double[]>(receivedData);

        //            for (int i = 0; i < Math.Min(weightData.Length, balancas.Count); i++)
        //            {
        //                var balanca = balancas[i];
        //                var produto = produtos.FirstOrDefault(p => p.BalancaId == balanca.id);

        //                if (produto != null)
        //                {
        //                    // Acesse o banco de dados diretamente para atualizar os valores
        //                    decimal pesoAtualBalanca = 0;

        //                    // Defina o valor de pesoAtualBalanca com base no tipo de balança
        //                    switch (i)
        //                    {
        //                        case 0:
        //                            pesoAtualBalanca = produto.PesoAtual;
        //                            break;
        //                        case 1:
        //                            pesoAtualBalanca = produto.PesoAtual;
        //                            break;
        //                        case 2:
        //                            pesoAtualBalanca = produto.PesoAtual;
        //                            break;
        //                            // Adicione mais casos conforme necessário
        //                    }

        //                    // Verifique se a diferença é maior que o percentual especificado (20%)
        //                    if (Math.Abs((double)pesoAtualBalanca - weightData[i]) > 0.05 * (double)pesoAtualBalanca)
        //                    {
        //                        // Atualize o valor de acordo com o tipo de balança
        //                        switch (i)
        //                        {
        //                            case 0:
        //                                produto.PesoAtual = (decimal)weightData[i];
        //                                break;
        //                            case 1:
        //                                produto.PesoAtual = (decimal)weightData[i];
        //                                break;
        //                            case 2:
        //                                produto.PesoAtual = (decimal)weightData[i];
        //                                break;
        //                                // Adicione mais casos conforme necessário
        //                        }

        //                        // Defina EmFalta como verdadeiro se o novo PesoAtual for menor que a QuantidadeMinima
        //                        produto.EmFalta = produto.PesoAtual < produto.QuantidadeMinima;

        //                        _context.Produto.Update(produto);
        //                        await _context.SaveChangesAsync();
        //                        string cor = "";
        //                        if (produto.PesoAtual == 0)
        //                        {
        //                            cor = "#DFAAAA"; // Vermelho para peso igual a zero
        //                        }
        //                        else if (produto.PesoAtual < produto.QuantidadeMinima)
        //                        {
        //                            cor = "#FFF0B6"; // Amarelo para peso menor que a quantidade mínima
        //                        }
        //                        else
        //                        {
        //                            cor = "#BEFFE0"; // Verde para peso maior que a quantidade mínima
        //                        }
        //                        return Json(new
        //                        {
        //                            success = true,
        //                            produtoName = produto.Nome,
        //                            novoPeso = produto.PesoAtual,
        //                            cor = cor,
        //                            emFalta = produto.EmFalta
        //                        });
        //                    }
        //                }
        //            }
        //        }

        //        // Adicione um retorno de sucesso no final do método
        //        return Json(new { success = true });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle the error as per your application's needs

        //        // Return success: false in case of connection failure
        //        return Json(new { success = false, errorMessage = ex.Message });
        //    }
        //}
        private static BluetoothClient _bluetoothClient;
        private static BluetoothClient _connectedClient;
        private static int simulationIndex = 0;
        public async Task<IActionResult> ReceivedArduinoData(string deviceId)
        {
            try
            {
                if (_bluetoothClient == null)
                {
                    _bluetoothClient = new BluetoothClient();
                }

                if (_connectedClient == null || !_connectedClient.Connected)
                {
                    BluetoothDeviceInfo[] devices = _bluetoothClient.DiscoverDevices();

                    BluetoothDeviceInfo selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == deviceId);
                    if (selectedDevice != null)
                    {
                        _connectedClient = new BluetoothClient();
                        _connectedClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
                    }
                }

                if (_connectedClient != null && _connectedClient.Connected)
                {
                    NetworkStream stream = _connectedClient.GetStream();
                    stream.ReadTimeout = 5000; // Ajuste conforme necessário

                    try
                    {
                        byte[] buffer = new byte[1024];
                        int bytesRead = stream.Read(buffer, 0, buffer.Length);
                        string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                        receivedData = receivedData.Split('\n', StringSplitOptions.RemoveEmptyEntries)[0];
                        Console.WriteLine("Dados Recebidos: " + receivedData);

                        var produtos = await _context.Produto.ToListAsync();
                        var balancas = await _context.Balanca.ToListAsync();

                        double[] weightData = JsonConvert.DeserializeObject<double[]>(receivedData);

                        List<object> results = new List<object>();

                        for (int i = 0; i < Math.Min(weightData.Length, balancas.Count); i++)
                        {
                            var balanca = balancas[i];
                            var produto = produtos.FirstOrDefault(p => p.BalancaId == balanca.id);

                            if (produto != null)
                            {
                                // Atualiza o banco de dados
                                UpdateDatabase(produto, weightData[i]);

                                // Adiciona os resultados à lista
                                string cor = GetCorForProduto(produto);
                                results.Add(new
                                {
                                    success = true,
                                    produtoId = produto.id,
                                    produtoName = produto.Nome,
                                    novoPeso = produto.PesoAtual,
                                    cor = cor,
                                    emFalta = produto.EmFalta
                                });
                            }
                        }
                    }
                    finally
                    {
                        if (_connectedClient.Connected)
                        {
                            _connectedClient.Close();
                        }
                    }
                }

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                // Handle the error as per your application's needs

                // Return success: false in case of connection failure
                return Json(new { success = false, errorMessage = ex.Message });
            }
        }


        // Função de simulação para retornar a string padrão
    //    private static string SimulateArduinoData()
    //    {
    //        string[] simulatedData = new[]
    //        {
    //    "[362.50,259.04,238.00,566371]",
    //    "[363.50,260.04,239.00,567403]",
    //    "[364.50,261.04,240.00,568435]",
    //    "[365.50,262.04,241.00,569467]",
    //    "[366.50,263.04,242.00,570500]",
    //    "[367.50,264.04,243.00,571532]",
    //    "[368.50,265.04,244.00,572564]"
    //};

    //        // Retorna a próxima string simulada e incrementa o índice
    //        string simulatedString = simulatedData[simulationIndex];
    //        simulationIndex = (simulationIndex + 1) % simulatedData.Length;

    //        return simulatedString;
    //    }

        // Alteração na função ReceivedArduinoData para chamar a função de simulação
        //public async Task<IActionResult> ReceivedArduinoData(string deviceId)
        //{
        //    try
        //    {
        //        // Remova a parte de descoberta de dispositivos Bluetooth para fins de simulação

        //        // Obtenha a string simulada
        //        string receivedData = SimulateArduinoData();

        //        Console.WriteLine("Dados Recebidos: " + receivedData);

        //        var produtos = await _context.Produto.ToListAsync();
        //        var balancas = await _context.Balanca.ToListAsync();

        //        double[] weightData = JsonConvert.DeserializeObject<double[]>(receivedData);

        //        // Lista para armazenar os resultados para todos os produtos
        //        List<object> results = new List<object>();

        //        for (int i = 0; i < Math.Min(weightData.Length, balancas.Count); i++)
        //        {
        //            var balanca = balancas[i];
        //            var produto = produtos.FirstOrDefault(p => p.BalancaId == balanca.id);

        //            if (produto != null)
        //            {
        //                // Atualiza o banco de dados
        //                UpdateDatabase(produto, weightData[i]);

        //                // Adiciona os resultados à lista
        //                string cor = GetCorForProduto(produto);
        //                results.Add(new
        //                {
        //                    success = true,
        //                    produtoId = produto.id,
        //                    produtoName = produto.Nome,
        //                    novoPeso = produto.PesoAtual,
        //                    cor = cor,
        //                    emFalta = produto.EmFalta
        //                });
        //            }
        //        }

        //        // Retorna a lista de resultados após processar todos os produtos
        //        return Json(results);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle the error as per your application's needs

        //        // Return success: false in case of connection failure
        //        return Json(new { success = false, errorMessage = ex.Message });
        //    }
        //}


        private void UpdateDatabase(Produto produto, double newWeight)
        {
            decimal pesoAtualBalanca = produto.PesoAtual;

            // Verifica a diferença
            if (Math.Abs((double)pesoAtualBalanca - newWeight) > 0.05 * (double)pesoAtualBalanca)
            {
                // Atualiza o valor
                produto.PesoAtual = (decimal)newWeight;

                // Define EmFalta como verdadeiro se o novo PesoAtual for menor que a QuantidadeMinima
                produto.EmFalta = produto.PesoAtual < produto.QuantidadeMinima;

                _context.Produto.Update(produto);
                _context.SaveChanges();
            }
        }

        private string GetCorForProduto(Produto produto)
        {
            if (produto.PesoAtual == 0)
            {
                return "#DFAAAA"; // Vermelho para peso igual a zero
            }
            else if (produto.PesoAtual < produto.QuantidadeMinima)
            {
                return "#FFF0B6"; // Amarelo para peso menor que a quantidade mínima
            }
            else
            {
                return "#BEFFE0"; // Verde para peso maior que a quantidade mínima
            }
        }


        public IActionResult PairDevice(string deviceId)
        {
            try
            {
                // Realize o pareamento do dispositivo com o ID fornecido (deviceId)
                BluetoothClient bluetoothClient = new BluetoothClient();
                BluetoothDeviceInfo[] devices = bluetoothClient.DiscoverDevices();

                // Encontre o dispositivo correspondente ao ID fornecido
                BluetoothDeviceInfo selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == deviceId); // Converte para string
                //return RedirectToAction("Home");
                if (selectedDevice != null)
                {
                    bool paired = BluetoothSecurity.PairRequest(selectedDevice.DeviceAddress, "1234"); // Substitua "1234" pela chave de pareamento desejada
                    BluetoothClient connectedClient = new BluetoothClient();

                    // Tente conectar ao dispositivo
                    try
                    {
                        connectedClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
                        NetworkStream stream = connectedClient.GetStream();

                        byte[] buffer = new byte[1024];

                        while (true)
                        {
                            int bytesRead = stream.Read(buffer, 0, buffer.Length);

                            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

                            Console.WriteLine("Dados Recebidos: " + receivedData);
                        }

                        // Se chegou até aqui, o pareamento foi bem-sucedido
                    }
                    catch (SocketException)
                    {
                        // O pareamento falhou
                        // Trate o erro de acordo com as necessidades da sua aplicação

                        // Retorne sucesso: false em caso de falha na conexão
                        return Json(new { success = false, errorMessage = "Falha na conexão. Por favor, tente novamente." });
                    }
                }
                else
                {
                    // Dispositivo não encontrado
                    // Trate o erro de acordo com as necessidades da sua aplicação

                    // Retorne sucesso: false em caso de falha na conexão
                    return Json(new { success = false });
                }
            }
            catch (Exception ex)
            {
                // Lidere com exceções, se ocorrerem durante o pareamento
                // Registre o erro ou trate-o de acordo com as necessidades da sua aplicação

                // Retorne sucesso: false em caso de falha na conexão
                return Json(new { success = false });
            }

            // O pareamento foi bem-sucedido
            return Json(new { success = true });
        }
        [HttpGet]
        public async Task<IActionResult> UpdateData()
        {
            try
            {
                var produtos = await _context.Produto.ToListAsync();

                foreach (var produto in produtos)
                {
                    // Simule uma mudança no peso atual (você pode obter isso de onde quiser)
                    produto.PesoAtual = produto.PesoAtual;

                    // Atualize EmFalta conforme necessário
                    produto.EmFalta = produto.PesoAtual < produto.QuantidadeMinima;

                    _context.Produto.Update(produto);
                }

                await _context.SaveChangesAsync();

                // Construa uma lista de objetos JSON com as informações necessárias
                var resposta = produtos.Select(p => new
                {
                    produtoId = p.id,
                    cor = ObterCorComBaseNoPeso(p),
                    novoPeso = p.PesoAtual.ToString("F0")
                }).ToList();

                // Retorne os dados atualizados para a interface
                return Json(new { success = true, produtos = resposta });
            }
            catch (Exception ex)
            {
                // Handle the error as per your application's needs

                // Return success: false in case of failure
                return Json(new { success = false, errorMessage = ex.Message });
            }
        }



        // Função para obter a cor com base no peso (substitua por sua lógica real)
        private string ObterCorComBaseNoPeso(Produto produto)
        {
            // Substitua isso por sua lógica real para determinar a cor
            if (produto.PesoAtual == 0)
            {
                return "#DFAAAA"; // Vermelho para peso igual a zero
            }
            else if (produto.PesoAtual < produto.QuantidadeMinima)
            {
                return "#FFF0B6"; // Amarelo para peso menor que a quantidade mínima
            }
            else
            {
                return "#BEFFE0"; // Verde para peso maior que a quantidade mínima
            }
        }
        public class Bluetooth
        {
            private BluetoothListener _listener;
            private CancellationTokenSource _cancelSource;

            public List<BluetoothClientExt> clients;
            public Action<string, string> onReceive;
            public Action<int> onClientJoin;

            public bool IsApplicationRunning { get; private set; }

            public Bluetooth()
            {
                clients = new List<BluetoothClientExt>();
            }
            public bool Start()
            {
                BluetoothRadio myRadio = BluetoothRadio.PrimaryRadio;
                if (myRadio == null)
                    return false;
                _cancelSource = new CancellationTokenSource();
                RadioMode mode = myRadio.Mode;
                _listener = new BluetoothListener(myRadio.LocalAddress, BluetoothService.SerialPort);
                _listener.Start();
                Task.Run(() => Listener(_cancelSource));
                return true;
            }

            public void Stop()
            {
                _cancelSource.Cancel();
                _listener.Stop();
                for (int i = 0; i < clients.Count; i++)
                    clients[i].Stop();
            }

            public int GetConnectedClients()
            {
                int result = 0;

                for (int i = clients.Count() - 1; i >= 0; i--)
                {
                    if (clients[i].isConnected == false)
                        clients.RemoveAt(i);
                    else
                        result++;
                }
                return result;
            }

            private void OnDisconnect()
            {
                for (int i = clients.Count() - 1; i >= 0; i--)
                {
                    if (clients[i].isConnected == false)
                    {
                        clients.RemoveAt(i);
                        onClientJoin?.Invoke(clients.Count());
                    }
                }
            }

            private void Listener(CancellationTokenSource token)
            {
                try
                {
                    while (IsApplicationRunning)
                    {

                        if (token.IsCancellationRequested)
                            break;

                        var client = new BluetoothClientExt(onReceive);
                        client.handler = _listener.AcceptBluetoothClient();
                        if (client.handler != null)
                        {
                            client.onDisconnect = OnDisconnect;
                            client.Start();
                            clients.Add(client);
                            onClientJoin?.Invoke(clients.Count());
                        }
                        for (int i = clients.Count() - 1; i >= 0; i--)
                        {
                            if (clients[i].isConnected == false)
                            {
                                clients.RemoveAt(i);
                                onClientJoin?.Invoke(clients.Count());
                            }
                        }
                    }
                }
                catch (Exception)
                { }

                for (int i = clients.Count() - 1; i >= 0; i--)
                    clients[i].Stop();

                clients.Clear();
            }

            public void RefreshTimer(string address)
            {
                for (int i = 0; i < clients.Count(); i++)
                {
                    if (clients[i].handler.RemoteEndPoint.Address.ToString() == address)
                        clients[i].RefreshTimer();
                }
            }

            public void Send(string address, string message)
            {
                for (int i = 0; i < clients.Count(); i++)
                {
                    if (clients[i].handler.RemoteEndPoint.Address.ToString() == address)
                        clients[i].Send(message);
                }
            }

            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            protected virtual void Dispose(bool disposing)
            {
                if (disposing)
                {
                    if (_cancelSource != null)
                    {
                        _listener.Stop();
                        _listener = null;
                        _cancelSource.Dispose();
                        _cancelSource = null;
                    }
                }
            }

        }
        public class BluetoothClientExt : IDisposable
        {
            public BluetoothClient handler = null;
            public bool isConnected = false;
            private Action<string, string> onReceive;
            private CancellationTokenSource cancelSource;
            public NetworkStream stream;
            private string incomingdata = "";
            private bool ping = false;
            private Stopwatch sw = new Stopwatch();
            public Action onDisconnect;
            private bool isApplicationRunning;

            public BluetoothClientExt(BluetoothClient _handler)
            {
                isConnected = true;
                handler = _handler;
                cancelSource = new CancellationTokenSource();
                Task.Run(() => Listener(cancelSource));
            }

            public BluetoothClientExt(BluetoothClient _handler, Action<string, string> action)
            {
                isConnected = true;
                handler = _handler;
                this.onReceive = action;
                cancelSource = new CancellationTokenSource();
                Task.Run(() => Listener(cancelSource));
            }

            public BluetoothClientExt(Action<string, string> action)
            {
                isConnected = false;
                this.onReceive = action;
                cancelSource = new CancellationTokenSource();
            }

            public void Start()
            {
                isConnected = true;
                stream = handler.GetStream();
                stream.ReadTimeout = 2;
                stream.WriteTimeout = 20;
                Task.Run(() => Listener(cancelSource));
            }

            public void SetOnReceive(Action<string, string> action)
            {
                onReceive = action;
            }

            public void Send(string arg)
            {
                if (isConnected == false)
                    return;
                incomingdata = arg;
            }

            private void PingPong(CancellationTokenSource token)
            {
                while (true)
                {
                    for (int i = 0; i < 10; i++)
                    {
                        if (token.IsCancellationRequested)
                            break;
                        Thread.Sleep(100);
                    }
                    ping = true;
                }
            }

            public void RefreshTimer()
            {
                sw.Restart();
            }

            public void Listener(CancellationTokenSource token)
            {
                string buffer = "";
                byte[] arg = new byte[1024 * 2];

                sw.Start();

                try
                {
                    while (isApplicationRunning)
                    {
                        Thread.Sleep(25);
                        if (token.IsCancellationRequested)
                            break;

                            if (handler.Connected == false)
                            {
                                isConnected = false;
                                if (handler != null)
                                    handler.Client.Disconnect(true);
                                onDisconnect?.Invoke();
                                return;
                            }

                            if (stream.DataAvailable == true)
                            {
                                var content = stream.Read(arg, 0, (1024 * 4) - 2);

                                if (content != 0)
                                {
                                    buffer += ASCIIEncoding.UTF8.GetString(Convert.FromBase64String(ASCIIEncoding.UTF8.GetString(arg, 0, content).Replace("\n", "").Replace("\r", "")));
                                    onReceive?.Invoke(handler.RemoteEndPoint.Address.ToString(), buffer);
                                    buffer = "";
                                }
                            }
                            else if (incomingdata.Length != 0)
                            {
                                byte[] ar = Encoding.UTF8.GetBytes(Convert.ToBase64String(Encoding.UTF8.GetBytes(incomingdata)));

                                stream.Write(ar, 0, ar.Length);
                                stream.Write(Encoding.UTF8.GetBytes("\r\n"), 0, 2);
                                incomingdata = "";
                            }
                        
                    }
                }
                catch (Exception)
                {
                    isConnected = false;
                    if (handler != null)
                        handler.Client.Disconnect(true);
                }
                isConnected = false;
                onDisconnect?.Invoke();
            }

            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            public void Stop()
            {
                cancelSource.Cancel();
            }

            protected virtual void Dispose(bool disposing)
            {
                if (disposing)
                {
                    if (cancelSource != null)
                    {
                        cancelSource.Dispose();
                        cancelSource = null;
                    }
                }
            }
        }


        public async Task<IActionResult> Delete(string Id)
        {
            if (Id == null)
            {
                return NotFound();
            }

            var user = await _userManager.Users.Where(m => m.Id == Id).FirstOrDefaultAsync();

            
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: Silos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {

            var user = await _context.Users.FindAsync(id);

            if (User.Identity.Name == user.Email)
            {
                return RedirectToAction(nameof(Index));
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExist(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
        //public class BluetoothService
        //{
        //    private static BluetoothClient bluetoothClient;
        //    private static NetworkStream networkStream;

        //    // Inicializa a conexão Bluetooth ao iniciar a aplicação
        //    static BluetoothService()
        //    {
        //        InitializeBluetoothConnection();
        //    }

        //    private static void InitializeBluetoothConnection()
        //    {
        //        bluetoothClient = new BluetoothClient();
        //        // Lógica para estabelecer a conexão Bluetooth aqui

        //        // Exemplo: conectar-se a um dispositivo específico
        //        var selectedDeviceId = "your_device_id_here";
        //        var devices = bluetoothClient.DiscoverDevices();
        //        var selectedDevice = devices.FirstOrDefault(d => d.DeviceAddress.ToString() == selectedDeviceId);

        //        if (selectedDevice != null)
        //        {
        //            bluetoothClient.Connect(selectedDevice.DeviceAddress, BluetoothService.SerialPort);
        //            networkStream = bluetoothClient.GetStream();
        //        }
        //    }

        //    public async Task<string> GetArduinoData()
        //    {
        //        // Lógica para obter dados do Arduino e atualizar o banco de dados
        //        // ...

        //        // Retornar os dados serializados como uma string (por exemplo, em JSON)
        //        return JsonConvert.SerializeObject(data);
        //    }
        //}




    }
}
