package com.erepnikov.model.response;

import com.erepnikov.model.security.JwtUser;

import java.io.Serializable;

public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;
    private final JwtUser user;

    public JwtAuthenticationResponse(String token, JwtUser user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return this.token;
    }

    public JwtUser getUser() {
        return this.user;
    }
}
