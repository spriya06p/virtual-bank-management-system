package com.virtualbank.service;

import com.virtualbank.model.AccountTransaction;
import com.virtualbank.repository.AccountTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountTransactionService {
    @Autowired
    private AccountTransactionRepository repository;

    public List<AccountTransaction> getAll() { return repository.findAll(); }
    public AccountTransaction getById(Long id) { return repository.findById(id).orElse(null); }
    public AccountTransaction create(AccountTransaction transaction) { return repository.save(transaction); }
    public AccountTransaction update(Long id, AccountTransaction transaction) {
        transaction.setId(id);
        return repository.save(transaction);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
