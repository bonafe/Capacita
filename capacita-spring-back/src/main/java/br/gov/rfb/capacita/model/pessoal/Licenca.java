package br.gov.rfb.capacita.model.pessoal;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Data; 

@Data
@Entity
public class Licenca{ 
	
	  private @Id @GeneratedValue(strategy=GenerationType.SEQUENCE) Long id;

	  @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	  private Colaborador colaborador;
	  
	  @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	  private TipoLicenca tipo;
	  	  
	  private String descricao;
	  private String numeroProcesso;
	  
	  //Período
	  private Date dataInicio;
	  private Date dataFim;
}
