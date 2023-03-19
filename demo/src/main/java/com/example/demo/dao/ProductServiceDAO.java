package com.example.demo.dao;

import com.example.demo.persitence.Product;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class ProductServiceDAO {
    private final EntityManager em;

    public ProductServiceDAO(EntityManager em) {
        this.em = em;
    }

    public List<Product> findBooks() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Product> cq = cb.createQuery(Product.class);
        Root<Product> from = cq.from(Product.class);
        return em.createQuery(cq).getResultList();
    }
}
