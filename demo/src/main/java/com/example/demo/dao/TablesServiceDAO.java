package com.example.demo.dao;

import com.example.demo.persitence.Tables;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class TablesServiceDAO {
    private final EntityManager em;

    public TablesServiceDAO(EntityManager em) {
        this.em = em;
    }

    public List<Tables> findBooks() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tables> cq = cb.createQuery(Tables.class);
        Root<Tables> from = cq.from(Tables.class);
        return em.createQuery(cq).getResultList();
    }
}
