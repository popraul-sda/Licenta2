package com.example.demo.dao;

import com.example.demo.persitence.FoodCategories;
import com.example.demo.persitence.Product;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Formatter;
import java.util.List;

@Repository
public class FoodCategoriesDAO {
    private final EntityManager em;

    public FoodCategoriesDAO(EntityManager em) {
        this.em = em;
    }

    public List<FoodCategories> findcategories() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<FoodCategories> cq = cb.createQuery(FoodCategories.class);
        Root<FoodCategories> from = cq.from(FoodCategories.class);
        return em.createQuery(cq).getResultList();
    }
}
