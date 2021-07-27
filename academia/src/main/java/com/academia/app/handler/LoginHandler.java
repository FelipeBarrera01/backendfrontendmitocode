package com.academia.app.handler;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.academia.app.model.Estudiante;
import com.academia.app.security.AuthRequest;
import com.academia.app.security.AuthResponse;
import com.academia.app.security.ErrorLogin;
import com.academia.app.security.JWTUtil;
import com.academia.app.service.IUsuarioService;

import reactor.core.publisher.Mono;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@Component
public class LoginHandler {

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private IUsuarioService service;

	public Mono<ServerResponse> login(ServerRequest req) {

		Mono<AuthRequest> monoAuthRequest = req.bodyToMono(AuthRequest.class);

		return monoAuthRequest.flatMap(ar -> {
			return service.buscarPorUsuario(ar.getUsername()).map((userDetails) -> {

				if (BCrypt.checkpw(ar.getPassword(), userDetails.getPassword())) {
					String token = jwtUtil.generateToken(userDetails);
					Date expiracion = jwtUtil.getExpirationDateFromToken(token);

					return new AuthResponse(token, expiracion);
				} else {
					return new ErrorLogin("credenciales incorrectas", new Date());
				}
			});

		}).flatMap(p -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(p)))
				.switchIfEmpty(ServerResponse.status(HttpStatus.UNAUTHORIZED).build());

	}

}
