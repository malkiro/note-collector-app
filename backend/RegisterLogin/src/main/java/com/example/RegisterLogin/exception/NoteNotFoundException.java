package com.example.RegisterLogin.exception;

public class NoteNotFoundException extends  RuntimeException{
    public NoteNotFoundException(Long id){
        super("Could note found the user with id " + id);
    }
}
