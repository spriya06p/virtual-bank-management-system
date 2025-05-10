package com.virtualbank.controller;

import com.virtualbank.model.User;
import com.virtualbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping public List<User> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public User getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public User create(@RequestBody User user) { return service.create(user); }
    @PutMapping("/{id}") public User update(@PathVariable Long id, @RequestBody User user) { return service.update(id, user); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
