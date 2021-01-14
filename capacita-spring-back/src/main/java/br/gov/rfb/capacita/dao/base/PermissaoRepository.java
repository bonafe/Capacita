package br.gov.rfb.capacita.dao.base;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.base.Permissao;

/**
 * 
 * Repositório para tratamento de permissões do sistema.
 * 
 * 
 *
 */
public interface PermissaoRepository extends JpaRepository<Permissao, Long> {	
	
	public Permissao findByNome(String nome);
}