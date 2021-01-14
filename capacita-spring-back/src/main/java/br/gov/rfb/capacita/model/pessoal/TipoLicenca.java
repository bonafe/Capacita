package br.gov.rfb.capacita.model.pessoal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data; 

@Data
@Entity
public class TipoLicenca {
	
	private @Id @GeneratedValue Long id;
	private String nome;		 
	private String sigla;
	private String descricao;
	private String referencias;
	
	public TipoLicenca() {
		super();
	}
	
	public TipoLicenca(String nome, String sigla, String descricao, String referencias) {
		super();
		this.nome = nome;
		this.sigla = sigla;
		this.descricao = descricao;
		this.referencias = referencias;
	}
	
	
}
