package com.example.portfolioappbackend.service;

import com.example.portfolioappbackend.model.Portfolio;
import com.example.portfolioappbackend.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {
    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio createPortfolio(Portfolio portfolio) throws Exception {
        if (portfolioRepository.findByIsin(portfolio.getIsin()).isEmpty()) {
            if (portfolio.getId() == null) {
                portfolio.setId(portfolioRepository.count() + 1); // Assuming ID is sequential and starts from 1
            }
            return portfolioRepository.save(portfolio);
        } else {
            throw new Exception("ISIN Already exists");
        }
    }

    public Optional<Portfolio> getPortfolioById(Long id) {
        return portfolioRepository.findById(id);
    }

    public Optional<Portfolio> getPortfolioByIsin(String isin) {
        return portfolioRepository.findByIsin(isin);
    }

    public List<Portfolio> getAllPortfolios() {
        List<Portfolio> portfolios = portfolioRepository.findAll();
        return portfolios;
    }

    public Portfolio updatePortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }
}
