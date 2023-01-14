package org.asgrim.lab4.repository;

import org.asgrim.lab4.entity.Entry;
import org.asgrim.lab4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUser(User user);

    @Transactional
    long deleteByUser(User user);
}
