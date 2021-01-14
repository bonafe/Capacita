package br.gov.rfb.capacita.model.pessoal.capacitacao;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import br.gov.rfb.capacita.model.pessoal.Colaborador;
import lombok.Data; 

@Data
@Entity
public class ParticipacaoEventoCapacitacao{ 
	
	  private @Id @GeneratedValue(strategy=GenerationType.SEQUENCE) Long id;

	  @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	  private Colaborador colaborador;
	  
	  @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	  private EventoCapacitacao evento;
}
