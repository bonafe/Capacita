package br.gov.rfb.capacita.dao.pessoal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.TipoLicenca;

public interface TipoLicencaRepository extends JpaRepository<TipoLicenca, Long> {	
					
	public TipoLicenca findBySigla (String sigla);
}