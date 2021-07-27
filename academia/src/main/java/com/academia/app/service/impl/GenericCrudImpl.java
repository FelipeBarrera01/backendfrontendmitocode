package com.academia.app.service.impl;

import com.academia.app.repository.IGenericRespository;
import com.academia.app.service.IGenericCrud;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public abstract class GenericCrudImpl <T, ID> implements IGenericCrud<T, ID> {

	protected abstract IGenericRespository<T, ID> getRepo();

	@Override
	public Mono<T> registrar(T t) {	
		
		return getRepo().save(t);
	}

	@Override
	public Mono<T> modificar(T t) {
		return getRepo().save(t);
	}

	@Override
	public Flux<T> listar() {
		return getRepo().findAll();
	}

	@Override
	public Mono<T> listarPorId(ID id) {
		return getRepo().findById(id);
	}

	@Override
	public Mono<Void> eliminar(ID id) {
		return getRepo().deleteById(id);
	}
	
	
	
}
