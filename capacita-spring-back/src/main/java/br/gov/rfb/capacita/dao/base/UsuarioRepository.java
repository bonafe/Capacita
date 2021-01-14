package br.gov.rfb.capacita.dao.base;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rfb.capacita.model.base.Usuario;

/**
 * 
 * Repositório para tratamento de usuários do sistema.
 * 
 *  
 * 
 *
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {	
	
	Usuario findByCpf(String cpf);
			
}