package org.asgrim.lab4.controllers;

import org.asgrim.lab4.exceptions.InvaliUserOrPasswordException;
import org.asgrim.lab4.exceptions.UserAlreadyExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAEE() {
        return ResponseEntity.badRequest().body("This user already exists");
    }

    @ExceptionHandler(InvaliUserOrPasswordException.class)
    public ResponseEntity<?> handleIUOPE() {
        return ResponseEntity.badRequest().body("Wrong login or password");
    }

}
