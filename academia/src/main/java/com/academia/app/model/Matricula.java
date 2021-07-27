package com.academia.app.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "matriculas")
public class Matricula {
	
	@Id
	private String id;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime fecha_matricula;
	
	
	private Estudiante estudiante;
	@NotEmpty
	private List<Curso> list_cursos;
	
	private boolean estado;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getFecha_matricula() {
		return fecha_matricula;
	}

	public void setFecha_matricula(LocalDateTime fecha_matricula) {
		this.fecha_matricula = fecha_matricula;
	}

	public Estudiante getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(Estudiante estudiante) {
		this.estudiante = estudiante;
	}

	public List<Curso> getList_cursos() {
		return list_cursos;
	}

	public void setList_cursos(List<Curso> list_cursos) {
		this.list_cursos = list_cursos;
	}

	public boolean isEstado() {
		return estado;
	}

	public void setEstado(boolean estado) {
		this.estado = estado;
	}
	
	
	
	

}
