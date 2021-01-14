import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { PessoalService } from '../pessoal_service.js';
import { RFBUtils } from '/WebCommonsRFB/rfb_utils.js';
import { IndicadoresSemanais } from './indicadores_semanais.js';

export class LinhaTempoLicenca extends HTMLElement {



	static _template = undefined;

	static get TEMPLATE (){

		if (LinhaTempoLicenca._template == undefined){
			LinhaTempoLicenca._template = document.createElement('template');

			LinhaTempoLicenca._template.innerHTML = `
			    <!-- Tema Bootstrap -->
			    <link rel='stylesheet' href = '/bibliotecas/bootstrap-4.5.3-dist/css/bootstrap.min.css'>
			    <script src='/bibliotecas/bootstrap-4.5.3-dist/js/bootstrap.min.js'></script>

			    <script type="text/javascript" src="/bibliotecas/vis.js/vis-timeline-graph2d.min.js"></script>
			    <link href="/bibliotecas/vis.js/vis-timeline-graph2d.min.css" rel="stylesheet">
                <style>

                    .vis-timeline {
                      border: 2px solid black;
                      font-family:  Arial, Helvetica, sans-serif;
                      font-size: 12pt;
                      background: rgba(255,255,255,50);
                    }

                    .vis-item {
                      border-color: #1F1FE5;
                      background-color: #090944;
                      font-size: 15pt;
                      color: white;
                      box-shadow: 5px 5px 20px rgba(128,128,128, 0.5);
                    }

                    .vis-item,
                    .vis-item.vis-line {
                      border-width: 3px;
                    }

                    .vis-item.vis-dot {
                      border-width: 10px;
                      border-radius: 10px;
                    }

                    .vis-item.vis-selected {
                      border-color: black;
                      background-color: yellow;
                      color: black;
                    }

                    .vis-time-axis .vis-text {
                      color: black;
                      padding-top: 10px;
                      padding-left: 10px;
                    }

                    .vis-time-axis .vis-text.vis-major {
                      font-weight: bold;
                    }

                    .vis-time-axis .vis-grid.vis-minor {
                      border-width: 2px;
                      border-color: #242476;
                    }

                    .vis-time-axis .vis-grid.vis-major {
                      border-width: 2px;
                      border-color: #151540;
                    }

                </style>
	             <div id="divElementos" style="width:100%; height:100%;">
                    <div id="divTimeline"></div>
                </div>
			`;
		}
		return LinhaTempoLicenca._template;
	}

	constructor (){
		super();
		this._licencas = [];
        this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(LinhaTempoLicenca.TEMPLATE.content.cloneNode(true));

		//Paleta de cores
        this.cores = ["#577590","#43aa8b","#90be6d","#f9c74f","#f8961e","#f3722c","#f94144"];
		this.criarEstilos();
	}

    selecionouLicenca(licenca){
         this.dispatchEvent(new CustomEvent("exibirLicenca", {detail:licenca}));
    }


	set licencas(novasLicencas){
	    this._licencas = novasLicencas;
	    setTimeout(() => {
	        this.gerarLinhaDoTempo();
	    });
	}



    get licencas(){
        return this._licencas;
    }



    criarEstilos(){

        let novoEstilo = document.createElement('style');
        novoEstilo.type = 'text/css';

        let estilo = '';

        this.cores.forEach ((cor, indice) => {
            estilo += `
                .vis-item.vis-background.indicador${indice}{
                    background-color: ${cor};
                }
            `;
        });

        novoEstilo.innerHTML = estilo;

        this._shadowRoot.appendChild(novoEstilo);
    }


    gerarItensLicenca(){
        let itens = [];

        this.dataMaisAntiga = null;
        this.dataMaisRecente = null;

        this.licencas.forEach (licenca => {
            let inicio = new Date(licenca.dataInicio);
            let fim = new Date(licenca.dataFim);

            itens.push ({
                id: licenca.id,
                content: licenca.tipo.nome,
                start: inicio,
                end: fim,
                editable: { updateTime: true, remove: true}
            });

            if (this.dataMaisAntiga == null){
                this.dataMaisAntiga = inicio;
            }else if (inicio.getTime() < this.dataMaisAntiga.getTime()){
                this.dataMaisAntiga = inicio;
            }

            if (this.dataMaisRecente == null){
                this.dataMaisRecente = fim;
            }else if (fim.getTime() > this.dataMaisRecente.getTime()){
                this.dataMaisRecente = fim;
            }
        });
        return itens;
    }


    gerarItensIndicadoresSemanais(){
        let itens = [];

        const [semanas, minimo, maximo] = IndicadoresSemanais.gerarIndicadoresSorteados();
        let amplitude = maximo - minimo;

        semanas.forEach((indicadorSemanal, indice) => {

            let valorTransformado = indicadorSemanal.valor - minimo;
            let indiceCor = Math.round((this.cores.length-1)*(valorTransformado/amplitude));

            console.log (`${indiceCor}`)

            itens.push ({
                id: `S${indice}`,
                start: indicadorSemanal.inicioSemana,
                end: indicadorSemanal.fimSemana,
                className: `indicador${indiceCor}`,
                type: 'background',
            });
        });

        return itens;
    }



    gerarLinhaDoTempo(){

        let itens = new vis.DataSet([]);
        itens.add(this.gerarItensLicenca());
        itens.add(this.gerarItensIndicadoresSemanais());

        let options = {
            height: '500px',
            align: 'center',
            editable: {
                add: false,
                updateTime: true,
                remove: true,
                overrideItems: false,
                snap: function (date, scale, step){
                    let dia = 24 * 60 * 60 * 1000;
                    return Math.round(date / dia) * dia;
                }
            },
            zoomMin: 1000 * 60 * 60 * 24 * 7,
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 5,
            start: this.dataMaisAntiga,
            end: this.dataMaisRecente,
            format:{
                minorLabels:{
                    week: 'D'
                }
            }
        };

        let divTimeline = this._shadowRoot.querySelector("#divTimeline");
        let timeline = new vis.Timeline(divTimeline, itens, options);
    }
}

window.customElements.define('linha-tempo-licenca', LinhaTempoLicenca);