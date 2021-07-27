package com.academia.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.academia.app.model.Usuario;
import com.academia.app.repository.IGenericRespository;
import com.academia.app.repository.IRolRepo;
import com.academia.app.repository.IUsuarioRepo;
import com.academia.app.security.User;
import com.academia.app.service.IUsuarioService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UsuarioServiceImpl extends GenericCrudImpl<Usuario, String> implements IUsuarioService{

	@Autowired
	private IUsuarioRepo repo;
	
	@Autowired
	private IRolRepo rolRepo;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Override
	protected IGenericRespository<Usuario, String> getRepo() {
		return repo; 
	}
	
	@Override
	public Mono<User> buscarPorUsuario(String usuario) {
		Mono<Usuario> monoUsuario = repo.findOneByUsuario(usuario);
		
		List<String> roles = new ArrayList<String>();
		
		return monoUsuario.flatMap(u -> {
			return Flux.fromIterable(u.getRoles())
					.flatMap(rol -> {
						return rolRepo.findById(rol.getId())
								.map(r -> {
									roles.add(r.getNombre());
									return r;
								});
					}).collectList().flatMap(list -> {
						u.setRoles(list);
						return Mono.just(u);
					});
		})	
		.flatMap(u -> {			
			return Mono.just(new User(u.getUsuario(), u.getClave(), u.getEstado(), roles));
		});
	}

	@Override
	public Mono<Usuario> registrarHash(Usuario usuario) {
		usuario.setClave(bcrypt.encode(usuario.getClave()));
		return repo.save(usuario);		
	}
}
