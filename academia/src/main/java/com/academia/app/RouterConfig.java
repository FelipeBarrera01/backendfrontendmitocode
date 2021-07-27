package com.academia.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.DELETE;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.PUT;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import com.academia.app.handler.CursoHandler;
import com.academia.app.handler.EstudianteHandler;
import com.academia.app.handler.LoginHandler;
import com.academia.app.handler.MatriculaHandler;

@Configuration
public class RouterConfig {
	
	@Bean
	public RouterFunction<ServerResponse> routesEstudiantes (EstudianteHandler handler){
		return route(GET("/v2/estudiantes"), handler::listar) //req -> handler.listar(req)
				.andRoute(GET("/v2/estudiantes/{id}"), handler::listarPorId)
				.andRoute(POST("/v2/estudiantes"), handler::registrar)
				.andRoute(PUT("/v2/estudiantes/{id}"), handler::modificar)
				.andRoute(DELETE("/v2/estudiantes/{id}"), handler::eliminar);
	}
	
	@Bean
	public RouterFunction<ServerResponse> routesCursos (CursoHandler handler){
		return route(GET("/v2/cursos"), handler::listar) //req -> handler.listar(req)
				.andRoute(GET("/v2/cursos/{id}"), handler::listarPorId)
				.andRoute(POST("/v2/cursos"), handler::registrar)
				.andRoute(PUT("/v2/cursos/{id}"), handler::modificar)
				.andRoute(DELETE("/v2/cursos/{id}"), handler::eliminar);
	}
	
	@Bean
	public RouterFunction<ServerResponse> routesMatricula (MatriculaHandler handler){
		return route(GET("/v2/matriculas"), handler::listar) //req -> handler.listar(req)
				.andRoute(GET("/v2/matriculas/{id}"), handler::listarPorId)
				.andRoute(POST("/v2/matriculas"), handler::registrar)
				.andRoute(PUT("/v2/matriculas/{id}"), handler::modificar)
				.andRoute(DELETE("/v2/matriculas/{id}"), handler::eliminar);
	}
	
	@Bean
	public RouterFunction<ServerResponse> routesLogin (LoginHandler handler){
		return route(POST("/v2/login"), handler::login); //req -> handler.listar(req)
				
	}

}
