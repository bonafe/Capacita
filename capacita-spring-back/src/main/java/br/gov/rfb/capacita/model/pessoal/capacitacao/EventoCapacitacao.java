package br.gov.rfb.capacita.model.pessoal.capacitacao;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Data; 

@Data
@Entity
public class EventoCapacitacao {
	
	private @Id @GeneratedValue Long id;
	private String nome;
	private String descricao;
	private String referencias;
	
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	Modalidade modalidade;
		
	private Date dataInicio;
	private Date dataFim;
	private int horas;
	
	public EventoCapacitacao() {
		super();
	}
	
}
