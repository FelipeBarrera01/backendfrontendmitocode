package com.academia.app.handler;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;


import com.academia.app.model.Matricula;
import com.academia.app.service.IMatriculaService;
import com.academia.app.validators.RequestValidator;

import reactor.core.publisher.Mono;

@Component
public class MatriculaHandler {
	
	@Autowired
	private IMatriculaService service;

	@Autowired
	private RequestValidator validadorGeneral;
	
	
	public Mono<ServerResponse> registrar(ServerRequest req) {
		Mono<Matricula> monoMatricula = req.bodyToMono(Matricula.class);

		return monoMatricula.flatMap(validadorGeneral::validate).flatMap(service::registrar)
				.flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)));

	}

	public Mono<ServerResponse> listar(ServerRequest req) {
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(service.listar(), Matricula.class);
	}

	public Mono<ServerResponse> listarPorId(ServerRequest req) {
		String id = req.pathVariable("id");

		return service.listarPorId(id)
				.flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> modificar(ServerRequest req) {

		Mono<Matricula> monoMatricula = req.bodyToMono(Matricula.class);
		Mono<Matricula> monoBD = service.listarPorId(req.pathVariable("id"));

		return monoBD.zipWith(monoMatricula, (bd, e) -> {

			bd.setEstado(e.isEstado());
			bd.setEstudiante(e.getEstudiante());
			bd.setFecha_matricula(e.getFecha_matricula());
			bd.setList_cursos(e.getList_cursos());

			return bd;
		}).flatMap(validadorGeneral::validate).flatMap(service::modificar)
				.flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> eliminar(ServerRequest req) {
		String id = req.pathVariable("id");

		return service.listarPorId(id)
				.flatMap(p -> service.eliminar(p.getId()).then(ServerResponse.noContent().build()))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

}
