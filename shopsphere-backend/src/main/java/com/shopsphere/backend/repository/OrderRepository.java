package com.shopsphere.backend.repository;

import com.shopsphere.backend.model.Order;
import com.shopsphere.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}