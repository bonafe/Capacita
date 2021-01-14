import { PessoalService } from '../pessoal_service.js';
import { SelectFromList } from '/WebCommonsRFB/select_from_list.js';

export class SelectRegiaoFiscal extends SelectFromList{

    constructor(){
        super();
        this.setAttribute("campo-id","id");
        this.setAttribute("campo-descricao","nomeReduzido");
        PessoalService.INSTANCE.regioesFiscais().then(regioes => this.render(regioes));
    }
}

window.customElements.define('select-regiao-fiscal', SelectRegiaoFiscal);