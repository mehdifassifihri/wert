package com.example.categoryservices.controllers;

import com.example.categoryservices.entities.Category;
import com.example.categoryservices.services.CategoryServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryControllers {
    @Autowired
    CategoryServicesImpl categoryServices;
    @GetMapping()
    ResponseEntity<List<Category>> getCategories(){
        return categoryServices.getCategories();
    }
    @PostMapping()
    Category addCategory(@RequestBody Category category){
        return categoryServices.addCategory(category);
    }
    @GetMapping("/{id}")
    Optional<Category> getCategoryById(@PathVariable int id){
        return categoryServices.getCategoryById(id);
    }



}
