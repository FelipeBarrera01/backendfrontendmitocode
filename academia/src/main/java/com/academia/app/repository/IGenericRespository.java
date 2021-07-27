package com.academia.app.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IGenericRespository <T, ID> extends ReactiveMongoRepository<T, ID>{

}
