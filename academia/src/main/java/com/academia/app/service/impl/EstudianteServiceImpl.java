package com.academia.app.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.academia.app.model.Estudiante;
import com.academia.app.repository.IEstudianteRepository;
import com.academia.app.repository.IGenericRespository;

import com.academia.app.service.IEstudianteService;

import reactor.core.publisher.Flux;



@Service
public class EstudianteServiceImpl extends GenericCrudImpl<Estudiante, String> implements IEstudianteService{

	
	@Autowired
	private IEstudianteRepository repo;
	
	@Override
	protected IGenericRespository<Estudiante, String> getRepo() {
		
		return repo;
	}

	@Override
	public Flux<Estudiante> findAllSort() {
		
		return repo.findAll (Sort.by(Sort.Direction.DESC, "edad"));
	}

	

	

}
