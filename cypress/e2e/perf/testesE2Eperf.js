import http from 'k6/http';
import { group, sleep, check } from 'k6';
let isFirstIteration = true;
export function setup() {
}
let valorToken
let produtoIdExistente
let componenteIdExistente
const url = "http://165.227.93.41/lojinha/v2/"
const gerarNomeAleatorio = () => 'Usuario' + Math.floor(Math.random() * 10000);
const gerarLoginAleatorio = () => 'login' + Math.floor(Math.random() * 10000);
const gerarSenhaAleatoria = () => 'senha' + Math.floor(Math.random() * 10000);

//Workload:
 export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // erros HTTP devem ser abaixo de 1%
    http_req_duration: ['p(95)<200'], // 95% das requisições devem ser abaixo de 200ms
  },
 /* cenarios: {
    cenario1: {
      executor: 'constant-arrival-rate',
      duration: '5s',
      preAllocatedVUs: 50,
      rate: 50,
      timeUnit: '1s',
    },
  }, */
  vus: 5, // 5 usuários virtuais simultâneos
  duration: '5s', // Duração total do teste
}; 

// http.get('https://test.k6.io'); //Entrando no endpoint
//Casos de testes: 
export default function () {
  let valorToken
  let produtoIdExistente
  let componenteIdExistente
  const url = "http://165.227.93.41/lojinha/v2/"

  group('Login com usuário válido', () => {
    const respostaLogin = http.post(`${url}login`, JSON.stringify({
      usuarioLogin: 'sabrina2024',
      usuarioSenha: 'sabrina2024'
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    check(respostaLogin, {
      'Status code é igual a 200': r => r.status === 200
    })
    valorToken = respostaLogin.json('data.token')
  })

  group('Criar um novo usuário', () => {
    const gerarNomeAleatorio = () => 'Usuario' + Math.floor(Math.random() * 10000);
    const gerarLoginAleatorio = () => 'login' + Math.floor(Math.random() * 10000);
    const gerarSenhaAleatoria = () => 'senha' + Math.floor(Math.random() * 10000);
    const respostaCriarUsuario = http.post(`${url}usuarios`, JSON.stringify({
      usuarioNome: 'gerarNomeAleatorio();',
      usuarioLogin: 'gerarNomeAleatorio();',
      usuarioSenha: 'gerarNomeAleatorio();',
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    check(respostaCriarUsuario, {
      'Status code é igual a 201': r => r.status === 201
    });
  })

  group('Cadastrar um novo produto', () => {
    const respostaCriarProduto = http.post(`${url}produtos`, JSON.stringify({
      produtoNome: 'Teste de performance',
      produtoValor: 2000,
      produtoCores: ['Preto', 'Vermelho'],
      produtoUrlMock: "",
      componentes: [
        {
          componenteNome: "teste",
          componenteQuantidade: 1,
        }
      ]
    }), {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    })
    check(respostaCriarProduto, {
      'Status code é igual a 201': (r) => r.status === 201,
    })
    produtoIdExistente = respostaCriarProduto.json().data.produtoId;
  });

  group('Buscar os produtos do usuário', () => {
    const respostaBuscarProduto = http.get(`${url}produtos`, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaBuscarProduto, {
      'Status code é igual a 200': (r) => r.status === 200,
    });
    produtoIdExistente = respostaBuscarProduto.json().data[0].produtoId;

  });

  group('Buscar um dos produtos do usuário', () => {
    const respostaBuscarUmProduto = http.get(`${url}produtos/${produtoIdExistente}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaBuscarUmProduto, {
      'Status code é igual a 200': (r) => r.status === 200,
    });

    produtoIdExistente = respostaBuscarUmProduto.json().data.produtoId;
  });

  group('Alterar informações de um produto', () => {
    const respostaAlterarInformaçõesProduto = http.put(`${url}produtos/${produtoIdExistente}`, JSON.stringify({
      produtoNome: 'Teste de performance 1',
      produtoValor: 2000,
      produtoCores: ['Preto', 'Vermelho'],
      produtoUrlMock: "",
      componentes: [
        {
          componenteNome: "teste",
          componenteQuantidade: 1,
        }
      ]
    }), {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaAlterarInformaçõesProduto, {
      'Status code é igual a 200': (r) => r.status === 200,
    });
    produtoIdExistente = respostaAlterarInformaçõesProduto.json().data.produtoId;
  });

  group('Cadastrar um componente', () => {
    const respostaCadastrarComponente = http.post(`${url}produtos/${produtoIdExistente}/componentes`, JSON.stringify({
      componenteNome: "Componente Teste",
      componenteQuantidade: 5,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      },
    });
  
    check(respostaCadastrarComponente, {
      'Status code é igual a 201': (r) => r.status === 201,
    });
  
    componenteIdExistente = respostaCadastrarComponente.json().data.componenteId;
  });
  
  group('Buscar dados dos componentes de um produto', () => {
    const respostaBuscarDadosComponenteDeUmProduto = http.get(`${url}produtos/${produtoIdExistente}/componentes`, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
  
    check(respostaBuscarDadosComponenteDeUmProduto, {
      'Status code é igual a 200': (r) => r.status === 200,
    });
  
    componenteIdExistente = respostaBuscarDadosComponenteDeUmProduto.json().data[0].componenteId;
  });
  
  group('Buscar um componente de um produto', () => {
    const respostaBuscarUmComponenteDeUmProduto = http.get(`${url}produtos/${produtoIdExistente}/componentes`, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
  
    check(respostaBuscarUmComponenteDeUmProduto, {
      'Status code é igual a 200': (r) => r.status === 200,
    });

    componenteIdExistente = respostaBuscarUmComponenteDeUmProduto.json().data[0].componenteId;
  });
  
  group('Alterar informações de um componente', () => {
    const respostaAlterarInformaçõesComponente = http.put(`${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`, JSON.stringify({
      componenteNome: "Componente Teste 5",
      componenteQuantidade: 10,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaAlterarInformaçõesComponente, {
      'Status code é igual a 200': (r) => r.status === 200,
    });
  });

  group('Remover um produto', () => {
    const respostaDeletarProduto = http.del(`${url}produtos/${produtoIdExistente}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaDeletarProduto, {
      'Status code é igual a 204': (r) => r.status === 204,
    });
  });

  group('Limpar dados do usuário', () => {
    const respostaDadosUsuario = http.del(`${url}dados`, null, {
      headers: {
        'Content-Type': 'application/json',
        'token': valorToken,
      }
    });
    check(respostaDadosUsuario, {
      'Status code é igual a 204': (r) => r.status === 204,
    });
  }); 

}  