package com.erepnikov.model.response;

/**
 * Class SessionResponse
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
public class SessionResponse extends OperationResponse {

    private SessionItem item;

    public SessionItem getItem() {
        return item;
    }

    public void setItem(SessionItem item) {
        this.item = item;
    }
}
