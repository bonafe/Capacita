package br.gov.rfb.capacita.dao.pessoal;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {	
				
	public Cargo findBySigla (String sigla);
}