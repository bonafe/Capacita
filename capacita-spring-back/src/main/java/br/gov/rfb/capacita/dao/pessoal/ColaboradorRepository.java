package br.gov.rfb.capacita.dao.pessoal;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.pessoal.Colaborador;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {	
				
	public Colaborador findByCpf (String cpf);
}