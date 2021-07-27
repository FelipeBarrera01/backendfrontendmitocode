package com.academia.app.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.http.MediaType;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import com.academia.app.model.Estudiante;
import com.academia.app.service.IEstudianteService;
import com.academia.app.validators.RequestValidator;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class EstudianteHandler {

	@Autowired
	private IEstudianteService service;

	@Autowired
	private RequestValidator validadorGeneral;

	public Mono<ServerResponse> registrar(ServerRequest req) {
		Mono<Estudiante> monoEstudiante = req.bodyToMono(Estudiante.class);

		return monoEstudiante.flatMap(validadorGeneral::validate).flatMap(service::registrar)
				.flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)));

	}

	public Mono<ServerResponse> listar(ServerRequest req) {
		
		Flux<Estudiante> estudiantes_ordenados = service.findAllSort();
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(estudiantes_ordenados, Estudiante.class);
	}

	public Mono<ServerResponse> listarPorId(ServerRequest req) {
		String id = req.pathVariable("id");

		return service.listarPorId(id)
				.flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> modificar(ServerRequest req) {

		Mono<Estudiante> monoEstudiante = req.bodyToMono(Estudiante.class);
		Mono<Estudiante> monoBD = service.listarPorId(req.pathVariable("id"));

		return monoBD.zipWith(monoEstudiante, (bd, e) -> {

			bd.setNombres(e.getNombres());
			bd.setApellidos(e.getApellidos());
			bd.setEdad(e.getEdad());
			bd.setDni(e.getDni());

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
