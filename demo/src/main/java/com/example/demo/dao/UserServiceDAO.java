package com.example.demo.dao;

import com.example.demo.model.Utilizator;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class UserServiceDAO {
    private final EntityManager em;

    public UserServiceDAO(EntityManager em) {
        this.em = em;
    }

    public List<Utilizator> findBooks() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Utilizator> cq = cb.createQuery(Utilizator.class);
        Root<Utilizator> from = cq.from(Utilizator.class);
        return em.createQuery(cq).getResultList();
    }
}
