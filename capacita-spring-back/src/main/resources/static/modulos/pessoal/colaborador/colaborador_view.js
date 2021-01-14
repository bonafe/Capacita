import { BindableHTMLElement } from '/WebCommonsRFB/bindable_html_element.js';
import { SelectCargo } from './select_cargo.js';
import { SelectRegiaoFiscal } from './select_regiao_fiscal.js';


export class ColaboradorView extends BindableHTMLElement {



	static _template = undefined;
	
	static get TEMPLATE (){

		if (ColaboradorView._template == undefined){
			ColaboradorView._template = document.createElement('template');

			ColaboradorView._template.innerHTML = `
			    <!-- Tema Bootstrap -->
			    <link rel='stylesheet' href = '/bibliotecas/bootstrap-4.5.3-dist/css/bootstrap.min.css'>
			    <script src='/bibliotecas/bootstrap-4.5.3-dist/js/bootstrap.min.js'></script>
			    <!-- TODO: não está funcionando o carregamento do script do tabulator dentro desse objeto, está carregando global-->
                <script type="text/javascript" src="/bibliotecas/tabulator/js/tabulator.min.js"></script>
	            <link href="/bibliotecas/tabulator/css/tabulator_modern.min.css" rel="stylesheet">
				<form>
					<div class="row">
						<div class="col-md-8">
						    <div class='form-group'>
							    <label for="inputCPF">CPF</label>
								<input type="text" id="inputCPF" data-bind='{"value":"cpf"}' class='form-control'></input>
							</div>
							<div class='form-group'>
							    <label for="inputNome">Nome</label>
								<input type="text" id="inputNome" data-bind='{"value":"nomeCompleto"}' class='form-control'></input>
							</div>
							<div class='form-group'>
							    <label for="inputApelido">Apelido</label>
								<input type="text" id="inputApelido" data-bind='{"value":"apelido"}' class='form-control'></input>
							</div>									
							<div class='form-group'>
							    <label for="inputAniversario">Aniversário</label>
								<input type="text" id="inputAniversario" data-bind='{"value":"aniversario"}' class='form-control'></input>
							</div>					
							<div class='form-group'>
							    <label for="inputTelefone">Telefone</label>
								<input type="text" id="inputTelefone" data-bind='{"value":"telefone"}' class='form-control'></input>
							</div>
							<div class='form-group'>
							    <label for="inputEmail">e-Mail</label>
								<input type="text" id="inputEmail" data-bind='{"value":"email"}' class='form-control'></input>
							</div>
							<div class='form-group'>
							    <label for="inputPreferencial">Contato Preferencial</label>
								<input type="text" id="inputPreferencial" data-bind='{"value":"contatoPreferencial"}' class='form-control'></input>
							</div>
							<div class='form-group'>
							    <label>Cargo</label>
								<select-cargo data-bind='{"value":"cargo.id"}'></select-cargo>
							</div>
							<div class='form-group'>
							    <label>Região Fiscal</label>
								<select-regiao-fiscal data-bind='{"value":"regiaoFiscal.id"}'></select-regiao-fiscal>
							</div>
                        </div>
		            </div>    
                    <button type="button" class='btn btn-primary' id='btnSalvar'>Salvar</button>
				</form>
			`;
		}
		return ColaboradorView._template;
	}
	
	
	
	constructor (){
		super();

		super.shadowRoot.appendChild(ColaboradorView.TEMPLATE.content.cloneNode(true));

		super.shadowRoot.querySelector("#btnSalvar").addEventListener("click", (evento) => {
		    this.dispatchEvent(new CustomEvent("atualizar", {detail:this.state}));
		});
	}



	set state(newState){
	    super.state = newState;
	}



    get state(){
        return super.state;
    }
}

window.customElements.define('colaborador-view', ColaboradorView);