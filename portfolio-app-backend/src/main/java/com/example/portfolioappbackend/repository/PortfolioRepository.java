package com.example.portfolioappbackend.repository;

import com.example.portfolioappbackend.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByIsin(String isin);
}
