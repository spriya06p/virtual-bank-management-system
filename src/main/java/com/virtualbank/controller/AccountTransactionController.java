package com.virtualbank.controller;

import com.virtualbank.model.AccountTransaction;
import com.virtualbank.service.AccountTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/transactions")
public class AccountTransactionController {
    @Autowired
    private AccountTransactionService service;

    @GetMapping public List<AccountTransaction> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public AccountTransaction getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public AccountTransaction create(@RequestBody AccountTransaction transaction) { return service.create(transaction); }
    @PutMapping("/{id}") public AccountTransaction update(@PathVariable Long id, @RequestBody AccountTransaction transaction) { return service.update(id, transaction); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
