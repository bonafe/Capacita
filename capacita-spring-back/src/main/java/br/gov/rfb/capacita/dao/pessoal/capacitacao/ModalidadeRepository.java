package br.gov.rfb.capacita.dao.pessoal.capacitacao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.capacitacao.Modalidade;

public interface ModalidadeRepository extends JpaRepository<Modalidade, Long> {	
	Modalidade findByNome(String nome);
}