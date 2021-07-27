package com.academia.app.service;



import com.academia.app.model.Estudiante;

import reactor.core.publisher.Flux;

public interface IEstudianteService extends IGenericCrud<Estudiante, String>{

	Flux<Estudiante> findAllSort();
}
