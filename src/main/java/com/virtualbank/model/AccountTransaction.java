package com.virtualbank.model;

import jakarta.persistence.*;

@Entity
public class AccountTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // deposit/withdrawal
    private double amount;
    private String date;
    private Long userId;

    // Constructors
    public AccountTransaction() {
    }

    public AccountTransaction(String type, double amount, String date, Long userId) {
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
