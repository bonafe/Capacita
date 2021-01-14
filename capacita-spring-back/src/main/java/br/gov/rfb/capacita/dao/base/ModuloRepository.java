package br.gov.rfb.capacita.dao.base;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.base.Modulo;

public interface ModuloRepository extends JpaRepository<Modulo, Long> {	
				
	public Modulo findByNome (String nome);
}