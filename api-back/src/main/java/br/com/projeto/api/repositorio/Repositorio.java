package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.Cliente;

public interface Repositorio extends CrudRepository<Cliente, Long>{
    
}
