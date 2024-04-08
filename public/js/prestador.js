<<<<<<< HEAD
//const urlBase = 'https://backend-mongodb-pi.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))
const access_token = localStorage.getItem("token") || null

//evento submit do formulário
document.getElementById('formPrestador').addEventListener('submit', function (event) {
    event.preventDefault() // evita o recarregamento
    const idPrestador = document.getElementById('id').value
    let prestador = {}

    if (idPrestador.length > 0) { //Se possuir o ID, enviamos junto com o objeto
        prestador = {
            "_id": idPrestador,
            "cnpj": document.getElementById('cnpj').value,
            "razao_social": document.getElementById('razao').value,
            "cnae_fiscal": document.getElementById('cnae').value,
            "nome_fantasia": document.getElementById('fantasia').value,
            "data_inicio_atividade": document.getElementById('inicio').value,
            "localizacao": {
                "type": "Point",
                "coordinates": [document.getElementById('lat').value, document.getElementById('long').value]
            }
        }
    } else {
        prestador = {
            "cnpj": document.getElementById('cnpj').value,
            "razao_social": document.getElementById('razao').value,
            "cnae_fiscal": document.getElementById('cnae').value,
            "nome_fantasia": document.getElementById('fantasia').value,
            "data_inicio_atividade": document.getElementById('inicio').value,
            "localizacao": {
                "type": "Point",
                "coordinates": [document.getElementById('lat').value, document.getElementById('long').value]
            }
        }
    }
    salvaPrestador(prestador)
})

async function salvaPrestador(prestador) {    
    if (prestador.hasOwnProperty('_id')) { //Se o prestador tem o id iremos alterar os dados (PUT)
        // Fazer a solicitação PUT para o endpoint dos prestadores
        await fetch(`${urlBase}/prestadores`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(prestador)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ Prestador alterado com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formPrestador').reset()
                    //Atualiza a UI
                    carregaPrestadores()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o prestador: ${error.message}</span>`
                resultadoModal.show();
            });

    } else { //caso não tenha o ID, iremos incluir (POST)
        // Fazer a solicitação POST para o endpoint dos prestadores
        await fetch(`${urlBase}/prestadores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(prestador)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ Prestador incluído com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formPrestador').reset()
                    //Atualiza a UI
                    carregaPrestadores()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o prestador: ${error.message}</span>`
                resultadoModal.show();
            });
    }
}

async function carregaPrestadores() {
    const tabela = document.getElementById('dadosTabela')
    tabela.innerHTML = '' //Limpa a tabela antes de recarregar
    // Fazer a solicitação GET para o endpoint dos prestadores
    await fetch(`${urlBase}/prestadores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access-token": access_token //envia o token na requisição
        }
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(prestador => {
                tabela.innerHTML += `
                <tr>
                   <td>${prestador.razao_social}</td>
                   <td>${prestador.nome_fantasia}</td>
                   <td>${prestador.cnae_fiscal}</td>
                   <td>${new Date(prestador.data_inicio_atividade).toLocaleDateString()}</td>                  
                   <td>${prestador.localizacao.coordinates[0]} / ${prestador.localizacao.coordinates[1]}</td>        
                   <td>
                       <button class='btn btn-danger btn-sm' onclick='removePrestador("${prestador._id}")'>🗑 Excluir </button>
                       <button class='btn btn-warning btn-sm' onclick='buscaPrestadorPeloId("${prestador._id}")'>📝 Editar </button>
                    </td>           
                </tr>
                `
            })
        })
        .catch(error => {
            document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o prestador: ${error.message}</span>`
            resultadoModal.show();
        });
}

async function removePrestador(id) {
    if (confirm('Deseja realmente excluir o prestador?')) {
        await fetch(`${urlBase}/prestadores/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    //alert('Registro Removido com sucesso')
                    carregaPrestadores() // atualiza a UI
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o prestador: ${error.message}</span>`
                resultadoModal.show();
            });
    }
}

async function buscaPrestadorPeloId(id) {
    await fetch(`${urlBase}/prestadores/id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access-token": access_token //envia o token na requisição
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data[0]) { //Iremos pegar os dados e colocar no formulário.
                document.getElementById('id').value = data[0]._id
                document.getElementById('razao').value = data[0].razao_social
                document.getElementById('cnpj').value = data[0].cnpj
                document.getElementById('fantasia').value = data[0].nome_fantasia
                document.getElementById('cnae').value = data[0].cnae_fiscal
                document.getElementById('inicio').value = data[0].data_inicio_atividade
                document.getElementById('lat').value = data[0].localizacao.coordinates[0]
                document.getElementById('long').value = data[0].localizacao.coordinates[1]
            }
        })
        .catch(error => {
            document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o prestador: ${error.message}</span>`
            resultadoModal.show();
        });
=======
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById('modalMensagem'))

async function carregaPrestadores(){
    const tabela = document.getElementById('dadosTabela')
    tabela.innerHTML = '' //limpa antes de recarregar
    //Faremos a requisição GET para a nossa API REST
    await fetch(`${urlBase}/prestadores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.table(data)
        data.forEach(prestador => {
            tabela.innerHTML += `
            <tr>
              <td>${prestador.razao_social}</td>
              <td>${prestador.nome_fantasia}</td>
              <td>${prestador.cnae_fiscal}</td>
              <td>${new Date(prestador.data_inicio_atividade).toLocaleDateString()}</td>
              <td>${prestador.localizacao.coordinates[0]} / ${prestador.localizacao.coordinates[1]}</td>
              <td>
        <button class='btn btn-danger btn-sm' onclick='removePrestador("${prestador._id}")'>🗑 Excluir </button>
              </td>
            </tr>
            `
        })
    })
}

async function removePrestador(id){
    if(confirm('Deseja realmente excluir este prestador?')){
        await fetch(`${urlBase}/prestadores/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            if (data.deletedCount > 0){carregaPrestadores() //atualizamos a UI
            }
        })
        .catch(error => {
            document.getElementById('mensagem').innerHTML = `Erro ao remover o prestador: ${error.message}`
            resultadoModal.show() //exibe o modal com o erro
        })
    }
}
document.getElementById('formPrestador').addEventListener('submit', function (event){
    event.preventDefault() // evita o recarregamento
    let prestador = {} // Objeto prestador
    prestador = {
        "cnpj": document.getElementById('cnpj1').value,
        "razao_social": document.getElementById('razao-social2').value,
        "nome_fantasia": document.getElementById('nome-fantasia3').value,
        "cnae_fiscal": document.getElementById('cnae14').value,
        "data_inicio_atividade": document.getElementById('data-de-inicio-da-atividade16').value,
        "localizacao": {
            "type": "Point",
            "coordinates": [document.getElementById('latitude11').value,
                            document.getElementById('longitude12').value]
        },
        "cep": document.getElementById('cep5').value,
        "endereco": {
            "logradouro": document.getElementById('logradouro6').value,
            "complemento": document.getElementById('complemento9').value,
            "bairro": document.getElementById('bairro7').value,
            "localidade": document.getElementById('localidade8').value,
            "uf": document.getElementById('unidade-da-federacao10').value
        }
    } /* fim do objeto */
    //alert(JSON.stringify(prestador)) //apenas para testes
    salvaPrestador(prestador)
})

async function salvaPrestador(prestador){
    await fetch(`${urlBase}/prestadores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prestador)
    })
    .then(response => response.json())
    .then(data => {
        if (data.acknowledged) {
            alert('Prestador incluído com sucesso!')
            //limpamos o formulário
            document.getElementById('formPrestador').reset()
            //atualizamos a listagem
            carregaPrestadores()
        } else if (data.errors){
 const errorMessages = data.errors.map(error => error.msg).join('\n')
 document.getElementById('mensagem').innerHTML = `<span class='text-danger'>${errorMessages}</span>`
 resultadoModal.show() //Mostra o modal
        }
    })
>>>>>>> 12522c4c1fdfd00b58816e4e17af10d07ef195c0

}