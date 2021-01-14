package br.gov.rfb.capacita.dao.pessoal;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.RegiaoFiscal;

public interface RegiaoFiscalRepository extends JpaRepository<RegiaoFiscal, Long> {	
				
	public RegiaoFiscal findBySigla (String sigla);
}