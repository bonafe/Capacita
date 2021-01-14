import { PessoalService } from '../pessoal_service.js';
import { SelectFromList } from '/WebCommonsRFB/select_from_list.js';

export class SelectTipoLicenca extends SelectFromList{

    constructor(){
        super();
        this.setAttribute("campo-id","id");
        this.setAttribute("campo-descricao","nome");
        PessoalService.INSTANCE.tiposLicenca().then(tipos => this.render(tipos));
    }
}

window.customElements.define('select-tipo-licenca', SelectTipoLicenca);