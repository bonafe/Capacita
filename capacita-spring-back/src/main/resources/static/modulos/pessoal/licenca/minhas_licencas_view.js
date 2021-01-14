import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { PessoalService } from '../pessoal_service.js';
import { LicencasView } from './licencas_view.js';

export class MinhasLicencasView extends BindableHTMLElement {



	static _template = undefined;
	
	static get TEMPLATE (){

		if (MinhasLicencasView._template == undefined){
			MinhasLicencasView._template = document.createElement('template');

			MinhasLicencasView._template.innerHTML = `
				<licencas-view></licencas-view>
			`;
		}
		return MinhasLicencasView._template;
	}
	
	
	
	constructor (){
		super();

		super.shadowRoot.appendChild(MinhasLicencasView.TEMPLATE.content.cloneNode(true));

		let licencasView = super.shadowRoot.querySelector("licencas-view");

		//super.shadowRoot.querySelector("#btnSalvar").addEventListener("click", (evento) => {
		//    this.dispatchEvent(new CustomEvent("atualizar", {detail:colaboradorView.state}));
		//});
		
		PessoalService.INSTANCE.minhasLicencas().then(licencas => {			
			licencasView.state = licencas;
		});
		
		
		
		licencasView.addEventListener("exibirLicenca", evento => {
			this.dispatchEvent(new CustomEvent("exibirLicenca", {detail:evento.detail}));
		});
		
		
	}

    atualizarLicenca(licenca){
        if (licenca.id == -1){
            PessoalService.INSTANCE.adicionarMinhaLicenca (licenca)
                .then(licencaAtualizada => alert ("Nova licença cadastrada com sucesso!"))
                .catch(err => {
                    alert (`Não foi possível cadastrar nova licença: ${err}`);
                });
        }else{
            PessoalService.INSTANCE.atualizarMinhaLicenca (licenca)
                .then(licencaAtualizada => alert ("Licença atualizada com sucesso!"))
                .catch(err => {
                    alert (`Não foi possível atualizarlicença: ${err}`);
                });
        }
    }


	set state(newState){
	    super.state = newState;
	}



    get state(){
        return super.state;
    }
}

window.customElements.define('minhas-licencas-view', MinhasLicencasView);