package com.shopsphere.backend.dto;

import lombok.Data;

@Data
public class CartItemRequest {
    private Long productId;
    private Integer quantity;
    private String size;
    private String color;
}