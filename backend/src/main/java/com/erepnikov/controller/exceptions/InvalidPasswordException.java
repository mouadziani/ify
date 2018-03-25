package com.erepnikov.controller.exceptions;

public class InvalidPasswordException extends Exception {

    static final long serialVersionUID = -1L;

    public InvalidPasswordException() {
        super("Invalid password");
    }
}
