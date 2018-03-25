package com.erepnikov.controller.exceptions;

public class LoginAlreadyUsedException extends Exception {

    static final long serialVersionUID = -1L;

    public LoginAlreadyUsedException() {
        super("Login already used");
    }
}
