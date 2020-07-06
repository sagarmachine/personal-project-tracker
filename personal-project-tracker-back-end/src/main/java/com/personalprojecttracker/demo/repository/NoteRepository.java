package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Integer> {
}
