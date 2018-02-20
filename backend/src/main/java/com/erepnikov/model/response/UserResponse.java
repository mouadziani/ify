package com.erepnikov.model.response;

import com.erepnikov.domain.user.User;

/**
 * Class UserResponse
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
public class UserResponse extends OperationResponse {

    private User data;

    public User getData() {
        return data;
    }

    public void setData(User data) {
        this.data = data;
    }
}
