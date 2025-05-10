package com.virtualbank.service;

import com.virtualbank.model.Branch;
import com.virtualbank.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BranchService {
    @Autowired
    private BranchRepository repository;

    public List<Branch> getAll() { return repository.findAll(); }
    public Branch getById(Long id) { return repository.findById(id).orElse(null); }
    public Branch create(Branch branch) { return repository.save(branch); }
    public Branch update(Long id, Branch branch) {
        branch.setId(id);
        return repository.save(branch);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
