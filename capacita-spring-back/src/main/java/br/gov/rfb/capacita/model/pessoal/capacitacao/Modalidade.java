package br.gov.rfb.capacita.model.pessoal.capacitacao;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data; 

@Data
@Entity
public class Modalidade {
	
	private @Id @GeneratedValue Long id;
	private String nome;
	private String descricao;
	private String referencias;			
	
	public Modalidade() {
		super();
	}
	
}
