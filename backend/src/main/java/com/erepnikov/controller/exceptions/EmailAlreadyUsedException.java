package com.erepnikov.controller.exceptions;

public class EmailAlreadyUsedException extends Exception {

    public EmailAlreadyUsedException() {
        super("Email address already used");
    }
}
