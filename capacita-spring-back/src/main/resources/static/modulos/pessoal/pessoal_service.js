import { ServiceUtils } from '/WebCommonsRFB/service_utils.js'
import { ConfiguracaoService } from '/WebCommonsRFB/configuracao_service.js';

export class PessoalService{



    static _instance = undefined;

    static get INSTANCE(){
        if (PessoalService._instance == undefined){
        	PessoalService._instance = new PessoalService();
        }
        return PessoalService._instance;
    }



    constructor(){
        this.baseUrl = ConfiguracaoService.INSTANCE.urlBase;
    }


	colaborador(id){
		return ServiceUtils.fetchJSON(`${this.baseUrl}/colaborador/${id}`);
	}
	
	minhasInformacoes(){
		return ServiceUtils.fetchJSON(`${this.baseUrl}/colaborador/minhas_informacoes`);
	}

	minhasLicencas(){
		return ServiceUtils.fetchJSON(`${this.baseUrl}/colaborador/minhas_licencas`);
	}
	
	novaLicenca(){
		return {
		    id:-1,
		    tipo:{id:-1}
		};
	}

	adicionarMinhaLicenca(licenca){
	    return ServiceUtils.postJSON(`${this.baseUrl}/colaborador/minhas_licencas`,licenca);
	}

	atualizarMinhaLicenca(licenca){
	    return ServiceUtils.putJSON(`${this.baseUrl}/colaborador/minhas_licencas`,licenca);
	}

    atualizarColaborador(colaborador){
        return ServiceUtils.putJSON(`${this.baseUrl}/colaborador`, colaborador);
    }    
    
     colaboradores(){
        return ServiceUtils.fetchJSON(`${this.baseUrl}/colaborador/listar`);
    }

    cargos(){
        return ServiceUtils.fetchJSON(`${this.baseUrl}/cargo/listar`);
    }
    
    regioesFiscais(){
        return ServiceUtils.fetchJSON(`${this.baseUrl}/regiao_fiscal/listar`);
    }
    
     tiposLicenca(){
        return ServiceUtils.fetchJSON(`${this.baseUrl}/tipo_licenca/listar`);
    }
}
