package com.virtualbank.service;

import com.virtualbank.model.User;
import com.virtualbank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public List<User> getAll() { return repository.findAll(); }
    public User getById(Long id) { return repository.findById(id).orElse(null); }
    public User create(User user) { return repository.save(user); }
    public User update(Long id, User user) {
        user.setId(id);
        return repository.save(user);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
