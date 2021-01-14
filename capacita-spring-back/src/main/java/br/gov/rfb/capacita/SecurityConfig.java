package br.gov.rfb.capacita;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import br.gov.rfb.capacita.dao.base.ModuloRepository;
import br.gov.rfb.capacita.dao.base.PermissaoRepository;
import br.gov.rfb.capacita.dao.base.UsuarioRepository;
import br.gov.rfb.capacita.dao.pessoal.CargoRepository;
import br.gov.rfb.capacita.dao.pessoal.ColaboradorRepository;
import br.gov.rfb.capacita.dao.pessoal.LicencaRepository;
import br.gov.rfb.capacita.dao.pessoal.RegiaoFiscalRepository;
import br.gov.rfb.capacita.dao.pessoal.TipoLicencaRepository;
import br.gov.rfb.capacita.model.base.Modulo;
import br.gov.rfb.capacita.model.base.Permissao;
import br.gov.rfb.capacita.model.base.Usuario;
import br.gov.rfb.capacita.model.pessoal.Cargo;
import br.gov.rfb.capacita.model.pessoal.Colaborador;
import br.gov.rfb.capacita.model.pessoal.RegiaoFiscal;
import br.gov.rfb.capacita.model.pessoal.TipoLicenca;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	
	
	@Autowired
	private UsuarioRepository repositorio;
	
	@Autowired
	private PermissaoRepository repositorioPermissao;
	
	@Autowired
	private ModuloRepository repositorioModulo;
	
	@Autowired
	private CargoRepository repositorioCargo;
	
	@Autowired
	private RegiaoFiscalRepository repositorioRegiaoFiscal;
	
	@Autowired
	private ColaboradorRepository repositorioColaborador;

	@Autowired
	private TipoLicencaRepository repositorioTipoLicenca;
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {   	
        http.csrf().disable().authorizeRequests()
                .anyRequest().authenticated().and()
                .x509()
                    .subjectPrincipalRegex("CN=(.*?)(?:,|$)")
                    .userDetailsService(userDetailsService());
        
        //TODO: verificar se pode ficar aqui ou precisa de profile específico
        http.headers().frameOptions().disable();
    }
 
    @Bean
    public UserDetailsService userDetailsService() {

    	return (UserDetailsService) username -> {
    		String cpf = username.split(":")[1];
    		Usuario usuario = repositorio.findByCpf(cpf);
    		
    		//Caso o usuário não exista no banco
            if (usuario == null) {
            	
            	boolean existemUsuarios = repositorio.count() > 0;
            	
            	//Cria um usuário para esse CPF
            	usuario = this.criarUsuario(cpf);
            	
            	//Cria um colaborador para esse CPF
            	this.criarColaborador(cpf);            	
            	
            	//Se ainda não existem usuários no repositório
            	if (!existemUsuarios) {
            		            		
            		//Inicia a base de dados
            		this.iniciarBaseDeDados();
            		
            		//Define primeiro usuário como cadastrador e administrador
            		this.definirPermissoesPrimeiroUsuario(cpf);
            		
            		usuario = this.repositorio.findByCpf(cpf);
            	}            	                                   
            }
            
            return new User(username, "",
                    AuthorityUtils
                            .commaSeparatedStringToAuthorityList(usuario.getPermissao()));
        };
    }
    
        
    private void iniciarBaseDeDados() {
    	    	    	
    	
    	//***************************************
    	// MÓDULOS E PERMISSÕES
    	Modulo sistema = this.repositorioModulo.findByNome("Sistema");    	
    	if (sistema == null) {
    		sistema = new Modulo();
    		sistema.setNome("Sistema");
    		sistema.setDescricao("Módulo responsável pelos usuários, permissões e configurações base do sistema");
    		this.repositorioModulo.saveAndFlush(sistema);
    	}		
		
					
		Permissao administrador = this.repositorioPermissao.findByNome("SISTEMA_ADMINISTRADOR");		
		if (administrador == null) {
			administrador = new Permissao();				
			administrador.setNome("SISTEMA_ADMINISTRADOR");
			administrador.setDescricao("Permite a manutenção das tabelas base do sistema");
			administrador.setModulo(this.repositorioModulo.findByNome("Sistema"));		
			this.repositorioPermissao.saveAndFlush(administrador);
		}
			
		
		Permissao cadastrador = this.repositorioPermissao.findByNome("SISTEMA_CADASTRADOR");
		if (cadastrador == null) {
			cadastrador = new Permissao();			
			cadastrador.setNome("SISTEMA_CADASTRADOR");
			cadastrador.setDescricao("Permite o cadastrado de usuários e permissões");		
			cadastrador.setModulo(this.repositorioModulo.findByNome("Sistema"));					
			this.repositorioPermissao.saveAndFlush(cadastrador);				
		}
		
		
		
		
		//***************************************
    	// INFORMAÇÕES BASE FEDERAL
		TipoLicenca tipoLicenca = this.repositorioTipoLicenca.findBySigla("DESEN");
		if (tipoLicenca == null) {
			tipoLicenca = new TipoLicenca ("Ação Desenvolvimento", "Desenvolvimento", "Ações de desenvolvimento presenciais ou à distância", "Decreto 9.991 de 2019 - Art. 25. I");
			this.repositorioTipoLicenca.saveAndFlush(tipoLicenca);
		}
		
		tipoLicenca = this.repositorioTipoLicenca.findBySigla("ACADE");
		if (tipoLicenca == null) {
			tipoLicenca = new TipoLicenca ("Elaboração Acadêmica", "Acadêmica", "Elaboração de monografia, trabalho de conclusão de curso, dissertação de mestrado, tese de doutorado, de livre-docência ou estágio pós-doutoral", "Decreto 9.991 de 2019 - Art. 25. II");
			this.repositorioTipoLicenca.saveAndFlush(tipoLicenca);
		}
		
		tipoLicenca = this.repositorioTipoLicenca.findBySigla("LINGU");
		if (tipoLicenca == null) {
			tipoLicenca = new TipoLicenca ("Língua Estrangueira", "Língua", " Participação em curso presencial ou intercâmbio para aprendizado de língua estrangeira, quando recomendável ao exercício de suas atividades, conforme atestado pela chefia imediata", "Decreto 9.991 de 2019 - Art. 25. II");
			this.repositorioTipoLicenca.saveAndFlush(tipoLicenca);
		}
		
		tipoLicenca = this.repositorioTipoLicenca.findBySigla("OUTROS");
		if (tipoLicenca == null) {
			tipoLicenca = new TipoLicenca ("Outros tipos de licença capacitação", "Outros", "Outras possibilidades do Art. 25 do Decreto 9.991 de 2019", "Decreto 9.991 de 2019 - Art. 25.");
			this.repositorioTipoLicenca.saveAndFlush(tipoLicenca);
		}
		
		
		//***************************************
    	// INFORMAÇÕES BASE RECEITA FEDERAL
		Cargo auditor = this.repositorioCargo.findBySigla("AFRFB");
		if (auditor == null) {
			auditor = new Cargo ("Auditor-Fiscal da Receita Federal do Brasil", "Auditor", "AFRFB");
			this.repositorioCargo.saveAndFlush(auditor);
		}
		
		Cargo analista = this.repositorioCargo.findBySigla("ATRFB");
		if (analista == null) {
			analista = new Cargo ("Analista Tributário da Receita Federal do Brasil", "Analista", "ATRFB");
			this.repositorioCargo.saveAndFlush(analista);
		}
		
		
		RegiaoFiscal regiao = this.repositorioRegiaoFiscal.findBySigla("UC");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					0,
					"Unidade Central da Receita Federal do Brasil","Unidade Central",
					"UC","Brasília", "DF", "BR");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF01");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					1,
					"Superintendência Regional da Receita Federal do Brasil da 1ª Região Fiscal","1ª Região Fiscal",
					"SRRF01","Brasília", "DF", "DF, GO, MT, MS, TO");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF02");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					2,
					"Superintendência Regional da Receita Federal do Brasil da 2ª Região Fiscal","2ª Região Fiscal",
					"SRRF02","Belém", "PA", "PA, AP, RR, RO, AM, AC");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF03");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					3,
					"Superintendência Regional da Receita Federal do Brasil da 3ª Região Fiscal","3ª Região Fiscal",
					"SRRF03","Fortaleza", "CE", "CE, PI, MA");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF04");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					4,
					"Superintendência Regional da Receita Federal do Brasil da 4ª Região Fiscal","4ª Região Fiscal",
					"SRRF04","Recife", "PE", "PE, AL, RN, PB");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF05");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					5,
					"Superintendência Regional da Receita Federal do Brasil da 5ª Região Fiscal","5ª Região Fiscal",
					"SRRF05","Salvador", "BA", "BA, SE");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF06");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					6,
					"Superintendência Regional da Receita Federal do Brasil da 6ª Região Fiscal","6ª Região Fiscal",
					"SRRF06","Belo Horizonte", "MG", "MG");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF07");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					7,
					"Superintendência Regional da Receita Federal do Brasil da 7ª Região Fiscal","7ª Região Fiscal",
					"SRRF07","Rio de Janeiro", "RJ", "RJ, ES");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF08");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					8,
					"Superintendência Regional da Receita Federal do Brasil da 8ª Região Fiscal","8ª Região Fiscal",
					"SRRF08","São Paulo", "SP", "SP");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF09");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					9,
					"Superintendência Regional da Receita Federal do Brasil da 9ª Região Fiscal","9ª Região Fiscal",
					"SRRF09","Curitiba", "PR", "PR, SC");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
		
		regiao = this.repositorioRegiaoFiscal.findBySigla("SRRF010");
		if (regiao == null) {
			regiao = new RegiaoFiscal(
					10,
					"Superintendência Regional da Receita Federal do Brasil da 10ª Região Fiscal","10ª Região Fiscal",
					"SRRF10","Porto Alegre", "RS", "RS");
			this.repositorioRegiaoFiscal.saveAndFlush(regiao);
		}
    }
    
    
    private void definirPermissoesPrimeiroUsuario(String cpf) {
    					
		//Cria novo usuário com o cpf e as permissões
		Usuario primeiroUsuario = this.repositorio.findByCpf(cpf);		
		primeiroUsuario.setPermissoes(new ArrayList<Permissao>());
		primeiroUsuario.getPermissoes().add(this.repositorioPermissao.findByNome("SISTEMA_ADMINISTRADOR"));
		primeiroUsuario.getPermissoes().add(this.repositorioPermissao.findByNome("SISTEMA_CADASTRADOR"));
				
		try {
			repositorio.saveAndFlush(primeiroUsuario);
		}catch(Exception ex) {
			ex.printStackTrace();
		}						
    }
    
    private Usuario criarUsuario(String cpf) {
		
		//Cria novo usuário com o cpf e as permissões
		Usuario novoUsuario = new Usuario();
		novoUsuario.setCpf(cpf);
		novoUsuario.setPermissoes(new ArrayList<Permissao>());		
				
		try {
			repositorio.saveAndFlush(novoUsuario);
		}catch(Exception ex) {
			ex.printStackTrace();
		}				
		
		return novoUsuario;
    }
    
    
    private void criarColaborador (String cpf) {
    	Colaborador colaborador = new Colaborador();
    	colaborador.setCpf(cpf);
    	this.repositorioColaborador.save(colaborador);
    }
 
}