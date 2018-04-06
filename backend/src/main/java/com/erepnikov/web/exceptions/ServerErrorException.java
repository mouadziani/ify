package com.erepnikov.web.exceptions;

public class ServerErrorException extends Exception {

    static final long serialVersionUID = -1L;

    public ServerErrorException(String message) {
        super(message);
    }
}
