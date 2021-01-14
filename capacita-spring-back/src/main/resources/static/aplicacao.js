
//import { DSIView } from "./despachoSimplificado/dsi_view.js";
//import { DSIConsulta } from "./despachoSimplificado/dsi_consulta.js";

import { AtividadesView } from "./vigilancia/gav/atividades/atividades_view.js";

export class GAA{

    static _instance = null;

    static get INSTANCE (){
        if (GAA._instance == null){
            GAA._instance = new GAA();
        }
        return GAA._instance;
    }

	constructor(){
		this.idPainel = 1;
		this.urlBase = location.protocol + "//" + location.host + location.pathname.slice(0,location.pathname.indexOf("aduana")-1);
		this.janelas_abertas = {};
		
		this.painelRedimensionado = function (event){
		}
		
		document.body.addEventListener("onload", this.carregouDocumento)
	}



	carregouDocumento(){
		//document.addEventListener("jspanelresize", painelRedimensionado, false);
		//jsPanel.ziBase = -1;
		
		window.addEventListener("message", this.receberMensagem, false);	
		
	}

	receberMensagem (event){		
		let informacoes_janela = janelas_abertas[event.source.name];	
		this.janela_resultado_tarefa.postMessage(JSON.stringify(informacoes_janela.tarefa), this.urlBase);	
	}

    criarPainel(elemento, referencia){
        this.idPainel++;

		var container = document.createElement("div");
		container.id = "painelPessoa_" + this.idPainel;

		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth* 0.8;

		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: elemento.titulo,//'Detalhe Funcionário - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});

		var detalhePessoa = new DetalhePessoa (this.urlBase, container.id, idPessoa);
		detalhePessoa.carregar();
    }

	criarPainelPessoa (idPessoa) {
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelPessoa_" + this.idPainel;	
		
		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth* 0.8;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Detalhe Funcionário - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var detalhePessoa = new DetalhePessoa (this.urlBase, container.id, idPessoa);
		detalhePessoa.carregar();
	}



	criarPainelEquipe (idEquipe) {
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelEquipe_" + this.idPainel;
		
		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth* 0.8;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Detalhe Equipe - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var detalheEquipe = new DetalheEquipe (this.urlBase, container.id, idEquipe);
		detalheEquipe.pessoaSelecionada = criarPainelPessoa;
		detalheEquipe.carregar();
	}

	criarPainelOrganograma(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var container = document.createElement("div");	
		container.id = "painelOrganograma_" + this.idPainel;
		
		
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Organograma - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1000 ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var organograma = new Organograma (this.urlBase, container.id);
		organograma.equipeSelecionada = criarPainelEquipe;
		organograma.pessoaSelecionada = criarPainelPessoa;
		organograma.carregar();		
	}

	criarPainelTrocaPlantao(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelTrocaPlantao_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Troca de Plantão - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '600 180',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var trocaPlantao = new TrocaPlantao (this.urlBase, container.id);
		trocaPlantao.carregar();		
	}

	
	criarPainelCarregamento(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelCarregamento" + this.idPainel;
		
		var painel = jsPanel.create({
			theme: {
				bgPanel: 'rgb(1, 89, 157)',
				bgContent: 'rgb(22, 89, 191)',
		        colorHeader: '#f0f0f0',
		        colorContent: '#333'
		    },
		    headerTitle: 'Teste Carregamento - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '500 500',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var carregamento = new Carregamento("Teste Carregamento", container.id);
		carregamento.iniciar();
	}


	criarPainelAniversarios(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelAniversarios_" + this.idPainel;
		
		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth* 0.8;
		
		var painel = jsPanel.create({
			theme: {
				bgPanel: 'rgb(1, 89, 157)',
				bgContent: 'rgb(22, 89, 191)',
		        colorHeader: '#f0f0f0',
		        colorContent: '#333'
		    },
		    headerTitle: 'Aniversários - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});	
		
		var aniversarios = new Aniversarios(this.urlBase, container.id);
		aniversarios.exibirAniversarios();		
	}


	criarPainelAdicionalNoturno(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelAdicionalNoturno_" + this.idPainel;
		
		var adicionalNoturno = new AdicionalNoturno(this.urlBase, container.id);	
		
		var painel = jsPanel.create({
			theme:       'primary',
		    headerTitle: 'Adicional Noturno - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '545 700',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		        adicionalNoturno.desenharTela();
		    }
		});				
	}

	criarPainelMovimentarPessoa(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelMovimentarPessoa_" + this.idPainel;
		
		var movimentarPessoa = new MovimentarPessoa(this.urlBase, container.id);	
		
		var painel = jsPanel.create({
			theme:       'primary',
		    headerTitle: 'Movimentar Funcionário - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '600 600',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		movimentarPessoa.carregar();
	}




	criarPainelRelatorioEscala(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelRelatorioEscala_" + this.idPainel;
		
		var relatorioEscala = new RelatorioEscala(this.urlBase, container.id);	
		
		var painel = jsPanel.create({
			theme:       'primary',
		    headerTitle: 'Relatório de Escala - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '400 85',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		        relatorioEscala.desenharTela();
		    }
		});				
	}


	criarPainelIndicadores(){
		
		this.idPainel++;
		
		var container = document.createElement("div");
		container.id = "painelIndicadores_" + this.idPainel;
		
		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth* 0.95;
		
		var indicadores = new Indicadores(this.urlBase, container.id);	
		
		var painel = jsPanel.create({
			theme: {
				bgPanel: 'rgb(1, 89, 157)',
				bgContent: 'rgb(22, 89, 191)',
		        colorHeader: '#f0f0f0',
		        colorContent: '#333'
		    },
		    headerTitle: 'DI: Tempo de Despacho em Canal - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		        indicadores.exibirIndicadores();
		    }
		});					
	}

	criarPainelAtividades(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var atividades = document.createElement("atividades-view");
		atividades.id = "painelAtividades_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Atividades - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1000 ' + altura,
		    content:     atividades,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});

		atividades.carregar();
	}

	criarPainelVoos(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var container = document.createElement("div");	
		container.id = "painelVoos_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Voos - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1000 ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var voos = new Voos(this.urlBase, container.id);
		voos.carregar();
	}

	criarPainelAreas(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var container = document.createElement("div");	
		container.id = "painelAreas_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Áreas - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1000 ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var areas = new Areas(this.urlBase, container.id);
		areas.carregar();
	}

	criarPainelDeTarefas(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		let largura = window.innerWidth * 0.95;
		
		var container = document.createElement("div");	
		container.id = "painelTarefas_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Painel de Tarefas do Dia - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: largura + ' ' + altura,
		    content:     container,
		    contentOverflow: 'hidden auto',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var tarefas = new Tarefas(this.urlBase, container.id);
		tarefas.bindMudarEstadoTarefa(criarPainelEstadoTarefa);
		tarefas.bindIncluirResultadoTarefa(criarPainelResultadoTarefa);
		tarefas.carregar();
	}


	criarPainelEstadoTarefa(tarefa){
		
		this.idPainel++;
			
		var container = document.createElement("div");
		container.id = "painelEstadoTarefa_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Estado tarefa - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '550 330',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		var estadoTarefa = new EstadoTarefa(this.urlBase, container, tarefa, painel);
		estadoTarefa.renderizar();
	}



	criarPainelResultadoTarefa(tarefa){
		
		/*
		let container = null;
			
		idPainel++;
				
		container = document.createElement("div");	
		container.id = "painelResultadoTarefa_" + this.idPainel;
		
		let painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'Resultado tarefa - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1200 600',
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});	
		
		let resultadoTarefa = new ResultadoTarefa(this.urlBase, container, tarefa);
		*/
		
		this.idPainel++;
		
		let nome_janela = "janela_resultado_tarefa_" + this.idPainel;
		
		let propriedades_janela = 
			"menubar=no," +
			"location=no," +
			"resizable=yes," +
			"scrollbars=yes," +
			"status=yes," +
			"width=1200," +
			"height=600";
		
		let url_resultado_tarefa = this.urlBase + "/aduana/vigilancia/gav/painel/resultadoTarefa.html";
		
		janela_resultado_tarefa = window.open (url_resultado_tarefa, nome_janela, propriedades_janela);
		
		janelas_abertas[nome_janela] = {
				"janela": janela_resultado_tarefa,
				"tarefa": tarefa
		};
	}



	criarPainelDSI(){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var container = document.createElement("div");
		container.id = "painelDSI_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'DSI - Alfândega de Viracopos',
		    position:    'center-top 0 58',
		    contentSize: '1300 ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var dsi = new ListaDSI(this.urlBase, container.id);
		dsi.selecionaDSI = this.criarPainelDetalheDSI;
		dsi.carregar();
	}


	criarPainelDetalheDSI(idDSI,referenciaDSI){
		
		this.idPainel++;
		
		let altura = window.innerHeight * 0.8;
		
		var container = document.createElement("div");	
		container.id = "painelDetalheDSI_" + this.idPainel;
		
		var painel = jsPanel.create({
		    theme:       'primary',
		    headerTitle: 'DSI - Alfândega de Viracopos',
		    position:    'center-top 0 120',
		    contentSize: '1200 ' + altura,
		    content:     container,
		    contentOverflow: 'scroll',
		    callback: function () {
		        this.content.style.padding = '20px';
		    }
		});
		
		var detalheDSI = new DetalheDSI(this.urlBase, container.id, idDSI, referenciaDSI);
	}



	menu(item){
		
		if (item.localeCompare("visualizarSetores") == 0){
			this.criarPainelOrganograma();		
		}else if (item.localeCompare("aniversarios") == 0){
			this.idPainel++;
			this.criarPainelAniversarios();
			
		}else if (item.localeCompare("adicionalNoturno") == 0){
			this.idPainel++;
			this.criarPainelAdicionalNoturno();
			
		}else if (item.localeCompare("movimentarPessoa") == 0){
			this.idPainel++;
			this.criarPainelMovimentarPessoa();
			
		}else if (item.localeCompare("trocaPlantao") == 0){
			this.idPainel++;
			this.criarPainelTrocaPlantao();	
		
		}else if (item.localeCompare("relatorioEscala") == 0){
			this.idPainel++;
			this.criarPainelRelatorioEscala();
			
		}else if (item.localeCompare("indicadores") == 0){
			this.idPainel++;
			this.criarPainelIndicadores();
			
		}else if (item.localeCompare("atividades") == 0){
			this.idPainel++;
			this.criarPainelAtividades();
			
		} else if (item.localeCompare("voos") == 0){
			this.idPainel++;
			this.criarPainelVoos();
			
		}  else if (item.localeCompare("areas") == 0){
			this.idPainel++;
			this.criarPainelAreas();
			
		} else if (item.localeCompare("tarefas") == 0){
			this.idPainel++;
			this.criarPainelDeTarefas();
			
		}else if (item.localeCompare("dsi") == 0){
			this.idPainel++;
			this.criarPainelDSI();
		}
		else if (item.localeCompare("detalheDSI") == 0){
			this.idPainel++;
			this.criarPainelDetalheDSI(-1,null);
		}
	}

	ativarMenu(){
		//$("#botaoMenu").css("display", "none");
		//$("#containerMenu").css("display", "block");	
	}

	desativarMenu(){
		//$("#botaoMenu").css("display", "block");
		//$("#containerMenu").css("display", "none");	
	}
}
