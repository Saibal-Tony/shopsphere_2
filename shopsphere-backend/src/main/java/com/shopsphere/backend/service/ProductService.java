package com.shopsphere.backend.service;

import com.shopsphere.backend.model.Product;
import com.shopsphere.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> getProducts(
            String category, String subCategory, String search,
            BigDecimal minPrice, BigDecimal maxPrice,
            Boolean inStock, Double rating, String sizes,
            String sortBy, int page, int size) {

        Sort sort = switch (sortBy) {
            case "price_asc" -> Sort.by("price").ascending();
            case "price_desc" -> Sort.by("price").descending();
            case "rating" -> Sort.by("rating").descending();
            default -> Sort.by("createdAt").descending();
        };

        Pageable pageable = PageRequest.of(page, size, sort);

        String cat = (category == null || category.isBlank()) ? null : category;
        String sub = (subCategory == null || subCategory.isBlank()) ? null : subCategory;
        String srch = (search == null || search.isBlank()) ? null : search;

        return productRepository.findWithFilters(
                cat, sub, srch, minPrice, maxPrice, inStock, rating, pageable);
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public List<Product> getFeatured() {
        return productRepository.findByIsFeaturedTrue();
    }

    public List<Product> getNewArrivals() {
        return productRepository.findByIsNewTrueOrderByCreatedAtDesc();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product update(Long id, Product updated) {
        Product existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setDiscountedPrice(updated.getDiscountedPrice());
        existing.setCategory(updated.getCategory());
        existing.setSubCategory(updated.getSubCategory());
        existing.setImageUrls(updated.getImageUrls());
        existing.setSizes(updated.getSizes());
        existing.setColors(updated.getColors());
        existing.setTags(updated.getTags());
        existing.setInStock(updated.getInStock());
        existing.setIsFeatured(updated.getIsFeatured());
        existing.setIsNew(updated.getIsNew());
        return productRepository.save(existing);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}