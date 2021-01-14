import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { PessoalService } from '../pessoal_service.js';
import { RFBUtils } from '/WebCommonsRFB/rfb_utils.js';
import { IndicadoresSemanais } from './indicadores_semanais.js';
import { LinhaTempoLicenca } from './linha_tempo_licenca.js';

export class LicencasView extends BindableHTMLElement {



	static _template = undefined;
	
	static get TEMPLATE (){

		if (LicencasView._template == undefined){
			LicencasView._template = document.createElement('template');

			LicencasView._template.innerHTML = `
			    <!-- Tema Bootstrap -->
			    <link rel='stylesheet' href = '/bibliotecas/bootstrap-4.5.3-dist/css/bootstrap.min.css'>
			    <script src='/bibliotecas/bootstrap-4.5.3-dist/js/bootstrap.min.js'></script>

			    <script type="text/javascript" src="/bibliotecas/vis.js/vis-timeline-graph2d.min.js"></script>
			    <link href="/bibliotecas/vis.js/vis-timeline-graph2d.min.css" rel="stylesheet">

			    <!-- TODO: não está funcionando o carregamento do script do tabulator dentro desse objeto, está carregando global-->
                <script type="text/javascript" src="/bibliotecas/tabulator/js/tabulator.min.js"></script>
	            <link href="/bibliotecas/tabulator/css/tabulator_modern.min.css" rel="stylesheet">

	             <div id="divElementos" style="width:100%; height:100%;">
	                <div id="divElementosExcetoTabela">
	                    <linha-tempo-licenca></linha-tempo-licenca>
                        <button type="button" class='btn btn-primary' id='btnSalvar'>Nova Licença</button>
                    </div>
                    <div id="divTabela"></div>
                </div>
			`;
		}
		return LicencasView._template;
	}
	
	
	
	constructor (){
		super();

	    this.largura = 800;
        this.altura = 600;

		super.shadowRoot.appendChild(LicencasView.TEMPLATE.content.cloneNode(true));

        this.divElementos = this._shadowRoot.querySelector("#divElementos");
        this.divElementosExcetoTabela = this._shadowRoot.querySelector("#divElementosExcetoTabela");
        this.divTabela = this._shadowRoot.querySelector("#divTabela");

		super.shadowRoot.querySelector("#btnSalvar").addEventListener("click", (evento) => {
			let novaLicenca = PessoalService.INSTANCE.novaLicenca();
		    this.dispatchEvent(new CustomEvent("exibirLicenca", {detail:novaLicenca}));
		});
	}

    selecionouLicenca(licenca){
         this.dispatchEvent(new CustomEvent("exibirLicenca", {detail:licenca}));
    }


	set state(newState){
	    super.state = newState;
	    setTimeout(() => {
	        this.gerarTabela();
	        super.shadowRoot.querySelector("linha-tempo-licenca").licencas = newState;
	    });
	}



    get state(){
        return super.state;
    }

    gerarTabela (){

        var referencia = this;

        this.limparTabela();

        this.tabela = new Tabulator(this.divTabela, {
            height:`${this.altura-50}px`,
            width: "100%",
            reactiveData:true,
            data:referencia.state,
            layout:"fitColumns",
            rowDblClick:function(e, row){
                if (row.getData().filhos === undefined){
                    referencia.selecionouLicenca(row.getData());
                }
            },
            columns:[
                {
                    title:"Tipo Licença",
                    field:"tipo.nome",
                    width:200,
                },
                {
                    title:"Descrição",
                    field:"descricao",
                    width:300
                },
                {
                    title:"Nº Processo",
                    field:"numeroProcesso",
                    width:150
                },
                {
                    title:"Data Inicio",
                    field:"dataInicio",
                    width:150,
                    formatter:
                        function(cell, formatterParams){
			 		       let dataInicio = cell.getValue();
			 		       return (dataInicio != null ? RFBUtils.dataDeISO8601_UTC(dataInicio) : '');
			 		    }
                },
                {
                    title:"Data Fim",
                    field:"dataFim",
                    width:150,
                    formatter:
                        function(cell, formatterParams){
			 		       let dataFim = cell.getValue();
			 		       return (dataFim != null ? RFBUtils.dataDeISO8601_UTC(dataFim) : '');
			 		    }
                }
            ]
        });
    }

    resize(largura, altura){

        this.largura = 800;
        this.altura = 600;

        if (this.tabela != null){
            let styleElementos = window.getComputedStyle(this.divElementos);
            let styleElementosExcetoTabela = window.getComputedStyle(this.divElementosExcetoTabela);
            let alturaTabela = parseInt(styleElementos.height,10) - parseInt(styleElementosExcetoTabela.height,10);
            this.tabela.setHeight (alturaTabela);
        }
    }
     redesenhar (){
        this.tabela.redraw();
    }



    limparTabela (){
        if (this.tabela != null){
            this.tabela.destroy();
            this.tabela = null;
        }
    }
}

window.customElements.define('licencas-view', LicencasView);