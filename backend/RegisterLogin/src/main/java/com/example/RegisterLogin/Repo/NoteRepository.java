package com.example.RegisterLogin.Repo;

import com.example.RegisterLogin.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note,Long> {
    @Query("SELECT n FROM Note n WHERE n.title LIKE %?1% OR n.description LIKE %?1%")
    List<Note> searchNotes(String searchText);
}
