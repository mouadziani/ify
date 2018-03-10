package com.erepnikov.controller.exceptions;

public class LoginAlreadyUsedException extends Exception {

    public LoginAlreadyUsedException() {
        super("Login already used");
    }
}
