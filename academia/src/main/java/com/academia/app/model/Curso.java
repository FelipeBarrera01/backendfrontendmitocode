package com.academia.app.model;

import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "cursos")
public class Curso {

	@Id
	private String id;
	
	@NotEmpty
	@Size(min = 3, message = "nombre minimo 3")
	private String nombre;
	@NotEmpty
	@Size(min = 3, message = "siglas minimo 3")
	private String siglas;
	
	private boolean estado;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getSiglas() {
		return siglas;
	}
	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}
	public boolean isEstado() {
		return estado;
	}
	public void setEstado(boolean estado) {
		this.estado = estado;
	}
	
	
	

}
