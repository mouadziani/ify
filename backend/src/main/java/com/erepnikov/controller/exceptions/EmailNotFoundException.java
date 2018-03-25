package com.erepnikov.controller.exceptions;

public class EmailNotFoundException extends Exception {

    static final long serialVersionUID = -1L;

    public EmailNotFoundException() {
        super("Email not found");
    }
}
