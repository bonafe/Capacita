import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { PessoalService } from '../pessoal_service.js';
import { ColaboradorView } from './colaborador_view.js';

export class MinhasInformacoesView extends BindableHTMLElement {



	static _template = undefined;
	
	static get TEMPLATE (){

		if (MinhasInformacoesView._template == undefined){
			MinhasInformacoesView._template = document.createElement('template');

			MinhasInformacoesView._template.innerHTML = `
				<colaborador-view></colaborador-view>
			`;
		}
		return MinhasInformacoesView._template;
	}
	
	
	
	constructor (){
		super();

		super.shadowRoot.appendChild(MinhasInformacoesView.TEMPLATE.content.cloneNode(true));

		let colaboradorView = super.shadowRoot.querySelector("colaborador-view");

		//super.shadowRoot.querySelector("#btnSalvar").addEventListener("click", (evento) => {
		//    this.dispatchEvent(new CustomEvent("atualizar", {detail:colaboradorView.state}));
		//});
		
		PessoalService.INSTANCE.minhasInformacoes().then(colaborador => {
			if (colaborador.cargo === null){
				colaborador.cargo = {id:-1};
			}
			if (colaborador.regiaoFiscal === null){
				colaborador.regiaoFiscal = {id:-1};
			}
			colaboradorView.state = colaborador;
		});
		
		colaboradorView.addEventListener("atualizar", evento => {
			PessoalService.INSTANCE.atualizarColaborador (evento.detail);
		});
	}



	set state(newState){
	    super.state = newState;
	}



    get state(){
        return super.state;
    }
}

window.customElements.define('minhas-informacoes-view', MinhasInformacoesView);