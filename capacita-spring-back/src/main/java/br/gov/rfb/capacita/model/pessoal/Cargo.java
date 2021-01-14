package br.gov.rfb.capacita.model.pessoal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data; 

@Data
@Entity
public class Cargo {
	
	private @Id @GeneratedValue Long id;
	private String nome;
	private String nomeReduzido;	  
	private String sigla;
	
	public Cargo() {
		super();
	}
	
	public Cargo(String nome, String nomeReduzido, String sigla) {
		super();
		this.nome = nome;
		this.nomeReduzido = nomeReduzido;
		this.sigla = sigla;
	}
}
