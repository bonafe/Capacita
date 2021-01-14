package br.gov.rfb.capacita.model.pessoal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data; 

@Data
@Entity
public class RegiaoFiscal {
	
	  private @Id @GeneratedValue Long id;
	  private int numero;
	  private String nome;
	  private String nomeReduzido;
	  private String sigla;
	  private String sede;
	  private String uf;
	  private String jurisdicao;
	  
	  public RegiaoFiscal() {
		  super();
	  }
	  
	public RegiaoFiscal(int numero, String nome, String nomeReduzido, String sigla, String sede, String uf,
			String jurisdicao) {
		super();
		this.numero = numero;
		this.nome = nome;
		this.nomeReduzido = nomeReduzido;
		this.sigla = sigla;
		this.sede = sede;
		this.uf = uf;
		this.jurisdicao = jurisdicao;
	}
	
	
	  
}
