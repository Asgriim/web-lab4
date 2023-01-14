package org.asgrim.lab4.service;

import lombok.RequiredArgsConstructor;
import org.asgrim.lab4.entity.User;
import org.asgrim.lab4.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User loadUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}