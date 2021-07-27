package com.academia.app.repository;



import com.academia.app.model.Usuario;

import reactor.core.publisher.Mono;

public interface IUsuarioRepo extends IGenericRespository<Usuario, String>{
		
	Mono<Usuario> findOneByUsuario(String usuario);	
}
