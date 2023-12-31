package com.example.categoryservices.services;

import com.example.categoryservices.entities.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CategoryServices {
    ResponseEntity<List<Category>> getCategories();
    Category addCategory(Category category);

    Optional<Category> getCategoryById(int id);
}
