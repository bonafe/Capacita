import { PessoalService } from '../pessoal_service.js';
import { SelectFromList } from '/WebCommonsRFB/select_from_list.js';

export class SelectCargo extends SelectFromList{

    constructor(){
        super();
        this.setAttribute("campo-id","id");
        this.setAttribute("campo-descricao","nomeReduzido");
        PessoalService.INSTANCE.cargos().then(cargos => this.render(cargos));
    }
}

window.customElements.define('select-cargo', SelectCargo);