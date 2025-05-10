package com.virtualbank.service;

import com.virtualbank.model.Loan;
import com.virtualbank.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository repository;

    public List<Loan> getAll() { return repository.findAll(); }
    public Loan getById(Long id) { return repository.findById(id).orElse(null); }
    public Loan create(Loan loan) { return repository.save(loan); }
    public Loan update(Long id, Loan loan) {
        loan.setId(id);
        return repository.save(loan);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
