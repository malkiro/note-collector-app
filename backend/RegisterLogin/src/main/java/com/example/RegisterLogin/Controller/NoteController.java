package com.example.RegisterLogin.Controller;

import com.example.RegisterLogin.Entity.Employee;
import com.example.RegisterLogin.Repo.NoteRepository;
import com.example.RegisterLogin.exception.NoteNotFoundException;
import com.example.RegisterLogin.Entity.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;

    private final String FOLDER_PATH = "E:\\Roshika\\2023 AFSD\\Assignments\\6\\learning-material-note-collector\\backend\\RegisterLogin\\src\\main\\resources\\static\\images/";


    @PostMapping("/note")
    public Note saveNote(@RequestParam(value = "title", required = false) String title,
                         @RequestParam(value = "description", required = false) String description,
                         @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
        String filePath = null;
        if(file != null && !file.isEmpty()) {
            filePath = FOLDER_PATH + file.getOriginalFilename();
            file.transferTo(new File(filePath));
        }

        Note note = new Note();
        note.setTitle(title);
        note.setDescription(description);
        if(filePath != null) {
            note.setFile_path("/images/" + file.getOriginalFilename());
        }
        return noteRepository.save(note);
    }

    /*get all notes*/
    @GetMapping("/notes")
    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }


//    @GetMapping("/notes")
//    public Page<Note> getAllNotes(@RequestParam(defaultValue = "0") int page,
//                                  @RequestParam(defaultValue = "2") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return noteRepository.findAll(pageable);
//    }


    @GetMapping("/note/{id}")
    public  Note getNoteById(@PathVariable Long id){
            return noteRepository.findById(id).orElseThrow(()->new NoteNotFoundException(id));
        }

    @GetMapping("/search")
    public List<Note> searchNotes(@RequestParam("searchText") String searchText) {
        return noteRepository.searchNotes(searchText);
    }


    @PutMapping("/note/{id}")
    public Note updateNote(@PathVariable Long id,
                           @RequestParam(value = "title", required = false) String title,
                           @RequestParam(value = "description", required = false) String description,
                           @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
        Note note = noteRepository.findById(id)
                .orElseThrow(()->new NoteNotFoundException(id));

        if (title != null) {
            note.setTitle(title);
        }

        if (description != null) {
            note.setDescription(description);
        }

        if (file != null && !file.isEmpty()) {
            String filePath = FOLDER_PATH + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            note.setFile_path("/images/" + file.getOriginalFilename());
        }
        return noteRepository.save(note);
    }

    @DeleteMapping("/note/{id}")
        String deleteNote(@PathVariable Long id){
            if(!noteRepository.existsById(id)){
                throw new NoteNotFoundException(id);
            }
            noteRepository.deleteById(id);
            return "User with id " +id+ " has been Deleted success";
        }

}
