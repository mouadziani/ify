package com.erepnikov.web.exceptions;

public class EmailAlreadyUsedException extends Exception {

    static final long serialVersionUID = -1L;

    public EmailAlreadyUsedException() {
        super("Email address already used");
    }
}
