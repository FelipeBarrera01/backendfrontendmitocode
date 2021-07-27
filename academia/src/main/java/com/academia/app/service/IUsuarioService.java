package com.academia.app.service;



import com.academia.app.model.Usuario;
import com.academia.app.security.User;

import reactor.core.publisher.Mono;

public interface IUsuarioService extends IGenericCrud<Usuario, String>{

	Mono<Usuario> registrarHash(Usuario usuario);
	Mono<User> buscarPorUsuario(String usuario);

}
