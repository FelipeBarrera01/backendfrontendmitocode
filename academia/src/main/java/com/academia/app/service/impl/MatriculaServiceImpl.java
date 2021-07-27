package com.academia.app.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.academia.app.model.Matricula;
import com.academia.app.repository.IGenericRespository;
import com.academia.app.repository.IMatriculaRepository;
import com.academia.app.service.IMatriculaService;


@Service
public class MatriculaServiceImpl extends GenericCrudImpl<Matricula, String> implements IMatriculaService{

	
	
	@Autowired
	IMatriculaRepository repo;
	
	@Override
	protected IGenericRespository<Matricula, String> getRepo() {
		// TODO Auto-generated method stub
		return repo;
	}

}
