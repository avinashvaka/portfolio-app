package com.example.portfolioappbackend.model;

import jakarta.persistence.*;

@Entity
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String ticker;

    @Column(nullable = false)
    private String exchange;

    @Column(nullable = false, unique = true)
    private String isin;

    @Column(nullable = true)
    private String website;

    public Long getId() {
        return this.id;
    }
    public void setId(Long value) {
        this.id = value;
    }

    public String getName() {
        return this.name;
    }
    public void setName(String value) {
        this.name = value;
    }

    public String getTicker() {
        return this.ticker;
    }
    public void setTicker(String value) {
        this.ticker = value;
    }

    public String getExchange() {
        return this.exchange;
    }
    public void setExchange(String value) {
        this.exchange = value;
    }

    public String getIsin() {
        return this.isin;
    }
    public void setIsin(String value) {
        this.isin = value;
    }

    public String getWebsite() {
        return this.website;
    }
    public void setWebsite(String value) {
        this.website = value;
    }
}
