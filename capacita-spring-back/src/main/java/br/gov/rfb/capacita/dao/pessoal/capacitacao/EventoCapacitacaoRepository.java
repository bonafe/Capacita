package br.gov.rfb.capacita.dao.pessoal.capacitacao;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.capacitacao.EventoCapacitacao;

public interface EventoCapacitacaoRepository extends JpaRepository<EventoCapacitacao, Long> {	
					
	EventoCapacitacao findByNomeAndDataInicioAndDataFim (String nome, Date dataInicio, Date dataFim);
}