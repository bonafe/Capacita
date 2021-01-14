package br.gov.rfb.capacita.dao.pessoal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.Licenca;

public interface LicencaRepository extends JpaRepository<Licenca, Long> {	
				
	public List<Licenca> findByColaborador_Cpf (String cpf);
}