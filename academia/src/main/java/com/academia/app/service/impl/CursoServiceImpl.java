package com.academia.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.academia.app.model.Curso;
import com.academia.app.repository.ICursoRespository;
import com.academia.app.repository.IGenericRespository;
import com.academia.app.service.ICursoService;


@Service
public class CursoServiceImpl extends GenericCrudImpl<Curso, String> implements ICursoService{

	
	@Autowired
	private ICursoRespository repo;
	
	@Override
	protected IGenericRespository<Curso, String> getRepo() {
		return repo;
	}
	
}
