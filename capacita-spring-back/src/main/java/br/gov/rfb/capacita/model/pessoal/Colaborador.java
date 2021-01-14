package br.gov.rfb.capacita.model.pessoal;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Data;


@Data
@Entity
public class Colaborador {

	private @Id @GeneratedValue Long id;
	private String cpf;
	
	private String nomeCompleto;
	private String apelido;
	private String aniversario;  		
	
	private String telefone;
	private String email;
	private String contatoPreferencial;
			
	
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private Cargo cargo;
	
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private RegiaoFiscal regiaoFiscal;	
}
