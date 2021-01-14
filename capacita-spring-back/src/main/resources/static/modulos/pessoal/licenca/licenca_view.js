import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { SelectTipoLicenca } from './select_tipo_licenca.js';
import { RFBUtils } from '/WebCommonsRFB/rfb_utils.js';



export class LicencaView extends BindableHTMLElement {



	static _template = undefined;
	
	static get TEMPLATE (){

		if (LicencaView._template == undefined){
			LicencaView._template = document.createElement('template');

			LicencaView._template.innerHTML = `
			    <!-- Tema Bootstrap -->
			    <link rel='stylesheet' href = '/bibliotecas/bootstrap-4.5.3-dist/css/bootstrap.min.css'>
			    <script src='/bibliotecas/bootstrap-4.5.3-dist/js/bootstrap.min.js'></script>
			    			   
				<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
				<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
				<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
				<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />



	            <form>
					<div class='row'>
						<div class='form-group col-md-4'>
				             <label for="selectTipoLicenca">Tipo Licença</label>
				             <select-tipo-licenca id="selectTipoLicenca" data-bind='{"value":"tipo.id"}'>
				             </select-tipo-licenca>
				        </div>
				        <div class='form-group col-md-4'>
				             <label for="numeroProcesso">Número Processo</label>
				             <input type="text" id="numeroProcesso" data-bind='{"value":"numeroProcesso"}' class='form-control'>
				             </input>
				        </div>
				    </div>
				    <div class='row'>
				    	<div class='form-group col-md-4'>
				             <label for="selectElementoAtividadeEscolhida">Descrição</label>
				             <input type="text" id="descricao" data-bind='{"value":"descricao"}' class='form-control'>
				             </input>
				        </div> 		
				    </div>	
				    <div class='row'>
						<div class='form-group col-md-4'>
				             <label for="dataInicio">Inicio</label>
				             <input type="date" id="dataInicio" data-bind='{"value":"dataInicio"}' class='form-control'>
				             </input>
				        </div> 		
				        <div class='form-group col-md-4'>
				             <label for="dataFim">Fim</label>
				             <input type="date" id="dataFim" data-bind='{"value":"dataFim"}' class='form-control'>
				             </input>
				        </div> 		
				    </div>
				</form>
				<button type="button" class='btn btn-primary' id='btnSalvar'>Salvar</button>
			`;
		}
		return LicencaView._template;
	}
	
	
	
	constructor (){
		super();

		super.shadowRoot.appendChild(LicencaView.TEMPLATE.content.cloneNode(true));

		super.shadowRoot.querySelector("#btnSalvar").addEventListener("click", (evento) => {
		    this.dispatchEvent(new CustomEvent("atualizarLicenca", {detail:this.state}));
		});;
	}



	set state(novoEstado){
	    novoEstado.dataInicio = (novoEstado.dataInicio !== undefined) ?
	        RFBUtils.dateInputFormatDeISO8601_UTC(novoEstado.dataInicio) :
	        RFBUtils.dateInputFormatDeISO8601_UTC(new Date());

	    novoEstado.dataFim= (novoEstado.dataFim !== undefined) ?
	        RFBUtils.dateInputFormatDeISO8601_UTC(novoEstado.dataFim) :
	        RFBUtils.dateInputFormatDeISO8601_UTC(new Date());

	    super.state = novoEstado;
	}



    get state(){
        return super.state;
    }
}

window.customElements.define('licenca-view', LicencaView);