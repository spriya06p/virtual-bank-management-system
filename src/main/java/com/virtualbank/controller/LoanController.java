package com.virtualbank.controller;

import com.virtualbank.model.Loan;
import com.virtualbank.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/loans")
public class LoanController {
    @Autowired
    private LoanService service;

    @GetMapping public List<Loan> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Loan getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Loan create(@RequestBody Loan loan) { return service.create(loan); }
    @PutMapping("/{id}") public Loan update(@PathVariable Long id, @RequestBody Loan loan) { return service.update(id, loan); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
