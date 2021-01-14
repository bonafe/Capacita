package br.gov.rfb.capacita.controller.pessoal;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.gov.rfb.capacita.dao.base.ModuloRepository;
import br.gov.rfb.capacita.dao.base.PermissaoRepository;
import br.gov.rfb.capacita.dao.base.UsuarioRepository;
import br.gov.rfb.capacita.dao.pessoal.CargoRepository;
import br.gov.rfb.capacita.dao.pessoal.ColaboradorRepository;
import br.gov.rfb.capacita.dao.pessoal.LicencaRepository;
import br.gov.rfb.capacita.dao.pessoal.RegiaoFiscalRepository;
import br.gov.rfb.capacita.dao.pessoal.TipoLicencaRepository;
import br.gov.rfb.capacita.dao.pessoal.capacitacao.EventoCapacitacaoRepository;
import br.gov.rfb.capacita.dao.pessoal.capacitacao.ModalidadeRepository;
import br.gov.rfb.capacita.dao.pessoal.capacitacao.ParticipacaoEventoCapacitacaoRepository;
import br.gov.rfb.capacita.exception.NotFoundException;
import br.gov.rfb.capacita.model.base.Modulo;
import br.gov.rfb.capacita.model.base.Permissao;
import br.gov.rfb.capacita.model.base.Usuario;
import br.gov.rfb.capacita.model.pessoal.Cargo;
import br.gov.rfb.capacita.model.pessoal.Colaborador;
import br.gov.rfb.capacita.model.pessoal.Licenca;
import br.gov.rfb.capacita.model.pessoal.RegiaoFiscal;
import br.gov.rfb.capacita.model.pessoal.TipoLicenca;
import br.gov.rfb.capacita.model.pessoal.capacitacao.EventoCapacitacao;
import br.gov.rfb.capacita.model.pessoal.capacitacao.Modalidade;
import br.gov.rfb.capacita.model.pessoal.capacitacao.ParticipacaoEventoCapacitacao;



@RestController
public class PessoalController {
	
	
	
	@Autowired
	private CargoRepository repositorioCargo;
	
	@Autowired
	private RegiaoFiscalRepository repositorioRegiaoFiscal;
	
	@Autowired
	private ColaboradorRepository repositorioColaborador;

	@Autowired
	private LicencaRepository repositorioLicenca;
	
	@Autowired
	private TipoLicencaRepository repositorioTipoLicenca;
	
	@Autowired
	private EventoCapacitacaoRepository repositorioEventoCapacitacao;
	
	@Autowired
	private ModalidadeRepository repositorioModalidade;
	
	@Autowired
	private ParticipacaoEventoCapacitacaoRepository repositorioParticipacaoEventoCapacitacao;
	
	
	
	public PessoalController() {		
	}

	
	@GetMapping("/colaborador/minhas_informacoes")
    public Colaborador colaboradorAtual(Principal principal) {
        String cpf = principal.getName().split(":")[1];
        Colaborador colaborador = this.repositorioColaborador.findByCpf(cpf);
        return colaborador;
    }
		
	@GetMapping("/colaborador/minhas_licencas")
    public List<Licenca> licencasColaboradorAtual(Principal principal) {
		String cpf = principal.getName().split(":")[1];
		return this.repositorioLicenca.findByColaborador_Cpf(cpf);
	}
	
	@PutMapping("/colaborador/minhas_licencas")	
	Licenca atualizarLicencaColaboradorAtual(Principal principal, @RequestBody Licenca licenca) {
		String cpf = principal.getName().split(":")[1];
		Colaborador colaboradorAtual = this.repositorioColaborador.findByCpf(cpf);
		licenca.setColaborador(colaboradorAtual);		
		return this.repositorioLicenca.save(licenca);
	}
	
	@PostMapping("/colaborador/minhas_licencas")
	Licenca novaLicencaColaboradorAtual(Principal principal, @RequestBody Licenca licenca) {
		String cpf = principal.getName().split(":")[1];
		Colaborador colaboradorAtual = this.repositorioColaborador.findByCpf(cpf);
		licenca.setColaborador(colaboradorAtual);	
		return this.repositorioLicenca.save(licenca);
	}
	
	
	@GetMapping("/regiao_fiscal/listar")
	List<RegiaoFiscal> listarRegioesFiscais() {
		return this.repositorioRegiaoFiscal.findAll();		
	}
	
	@GetMapping("/cargo/listar")
	List<Cargo> listarCargos() {
		return this.repositorioCargo.findAll();		
	}
	
	@GetMapping("/tipo_licenca/listar")
	List<TipoLicenca> listarTiposLicenca() {
		return this.repositorioTipoLicenca.findAll();		
	}

	@GetMapping("/colaborador/{id}")
	Colaborador buscarUsuario(@PathVariable Long id) {
		return this.repositorioColaborador.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	@GetMapping("/colaborador/listar")
	List<Colaborador> listarColaboradores() {
		return this.repositorioColaborador.findAll();		
	}
		
	@PutMapping("/colaborador")
	Colaborador atualizarColaborador(@RequestBody Colaborador colaborador) {		
		return this.repositorioColaborador.save(colaborador);
	}	
	
	@GetMapping("/colaborador/{cpf}/licenca/listar")
	List<Licenca> listarLicencasPorCPF(@PathVariable String cpf) {
		return this.repositorioLicenca.findByColaborador_Cpf(cpf);		
	}
	
	
	@PutMapping("/colaborador/licenca")
	Licenca atualizarLicenca(@RequestBody Licenca licenca) {		
		return this.repositorioLicenca.save(licenca);
	}
	
	@PostMapping("/colaborador/licenca")
	Licenca novaLicenca(@RequestBody Licenca licenca) {		
		return this.repositorioLicenca.save(licenca);
	}
	
	@DeleteMapping("/colaborador/licenca")
	void deletarLicenca(@RequestBody Licenca licenca) {		
		this.repositorioLicenca.delete(licenca);
	}
	
	
	
	@GetMapping("/licenca/listar")
	List<Licenca> listarLicencas() {
		return this.repositorioLicenca.findAll();		
	}	
	
	//Função especial que cria os campos se eles não existirem
	@PostMapping("/colaborador/participacao_evento_capacitacao")
	ParticipacaoEventoCapacitacao adicionarEventCapacitacao(@RequestBody ParticipacaoEventoCapacitacao participacao) {		
		
		//Se o colaborador veio sem ID
		if ((participacao.getColaborador().getId() == null) || (participacao.getColaborador().getId() == -1)){
			
			//Verifica o colaborador existente...
			Colaborador colaborador = this.repositorioColaborador.findByCpf(participacao.getColaborador().getCpf());
			
			//... ou cria se não existir
			if (colaborador == null) {
				colaborador = new Colaborador();
				colaborador.setCpf(participacao.getColaborador().getCpf());
				colaborador = this.repositorioColaborador.saveAndFlush(colaborador);
			}
			participacao.setColaborador(colaborador);		
		}
		
		//Se o evento veio sem ID
		if ((participacao.getEvento().getId() == null) || (participacao.getEvento().getId() == -1)){
			
			//Verifica o evento de capacitação existente...
			EventoCapacitacao evento = this.repositorioEventoCapacitacao.findByNomeAndDataInicioAndDataFim(
					participacao.getEvento().getNome(), 
					participacao.getEvento().getDataInicio(), 
					participacao.getEvento().getDataFim());
			
			//... ou cria se não existir
			if (evento == null) {
				
				//Verifica se o modulo existe...
				Modalidade modalidade = this.repositorioModalidade.findByNome(participacao.getEvento().getModalidade().getNome());
				
				//... cria se não existir
				if (modalidade == null) {
					modalidade = new Modalidade();
					modalidade.setNome(participacao.getEvento().getModalidade().getNome());
					modalidade = this.repositorioModalidade.saveAndFlush(modalidade);
				}
				
				evento = new EventoCapacitacao();
				evento.setNome(participacao.getEvento().getNome());
				evento.setDataInicio(participacao.getEvento().getDataInicio());
				evento.setDataFim(participacao.getEvento().getDataFim());
				evento.setModalidade(modalidade);
				
				this.repositorioEventoCapacitacao.saveAndFlush(evento);
			}
			participacao.setEvento(evento);
		}
		
		return this.repositorioParticipacaoEventoCapacitacao.saveAndFlush(participacao);
	}
}