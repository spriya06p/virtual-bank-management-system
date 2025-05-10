package com.virtualbank.controller;

import com.virtualbank.model.Branch;
import com.virtualbank.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/branches")
public class BranchController {
    @Autowired
    private BranchService service;

    @GetMapping public List<Branch> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Branch getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Branch create(@RequestBody Branch branch) { return service.create(branch); }
    @PutMapping("/{id}") public Branch update(@PathVariable Long id, @RequestBody Branch branch) { return service.update(id, branch); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
