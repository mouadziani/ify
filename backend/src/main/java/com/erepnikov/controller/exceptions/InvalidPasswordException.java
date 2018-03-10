package com.erepnikov.controller.exceptions;

public class InvalidPasswordException extends Exception {

    public InvalidPasswordException() {
        super("Invalid password");
    }
}
